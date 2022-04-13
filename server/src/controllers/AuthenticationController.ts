import { Request, Response  } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/connection';
import { secret } from "../config/auth";
import sendMail from '../services/sendMail';
import commonErros from '../utils/commonErrorResponses';

function generateToken(id: string, expires: boolean, expiresIn= 86400) {
    if(expires) {
        return jwt.sign({ id }, secret, { expiresIn }); 
    } else {
        return jwt.sign({id}, secret);
    }
}

let tokenTimer: NodeJS.Timeout

export default class AuthenticationController {

    static async singUp(req: Request, res: Response) {
        const {name, surname, email, password } = req.body
        const parsedName = String(name).concat("", String(surname))
        const trx = await db.transaction();


        try {
            //verifying if user email already exists in database
            const response = await trx('users').select('*').where('email', '=', email)
            if (response.length > 0) {
                //email already exist
                return res.status(400).json({ error: "Este email já foi cadastrado." })
            } else {
                //email doesnt exist
                bcrypt.genSalt(10, async (_, salt) => {
                    const hashPassword = await bcrypt.hash(password, salt)

                    //generate user id 
                    const limit = String(password).length
                        ? String(email).length
                        : String(password).length

                    let userId =""

                    for (let i = 0; i < limit; i++) {
                        if (email.charAt(i)){
                            userId += email.charAt(i)
                            if (password.charAt(i))
                                userId += password.charAt(i)
                        } else { 
                                userId += password.charAt(i)
                            }
                    }

                    bcrypt.hash(userId, 5, async (err, hashId) => {
                        if (err) return res.status(400).json({ error: "Ocorreu um erro interno. tente mais tarde" })

                        const newUser ={
                            __id: hashId,
                            name: parsedName,
                            email,
                            password: hashPassword
                        }

                        //Register user on database
                        const registerUser = await trx('users').insert(newUser);

                        if (registerUser) {
                            await trx.commit();
                            return res.status(200).json({ status: 'ok'});
                        } else {
                            await trx.rollback();
                            return commonErros.internalServerError(res);
                        }

                    })  
                })
            }
        } catch(err) {
            await trx.rollback();
            return commonErros.internalServerError(res);
        }
    }
    
    static async signin(req: Request, res: Response) {
        const { email, password, rememberUser } = req.body
        const trx = await db.transaction();

        try {
            //find user by email
            const fetchUserPassword: { password: String }[] = await trx('users')
            .select('password').where('email', '=', email)

            if (fetchUserPassword.length === 0) {
                //user not found
                res.status(400).json({ error: 'Não foi encontrado nenhum usuário com o email informado.'})
            } else {
                //user found
                const fetchedPassword = fetchUserPassword[0].password

                //comparing recieved passwod with stored one
                bcrypt.compare(password, fetchedPassword, async (err, same) => {
                    if (err) return commonErros.internalServerError(res)
                    else if (!same) return res.status(400).json({ error: 'Senha incorreta. Tente novamente'})
                    else {
                        //passwords are eaqual, proceeding to signin user
                        const user = await 
                            trx('users')
                                .select('__id', 'name', 'whatsapp', 'bio')
                                .where('email', '=', email).first()
                        const token = generateToken(user.__id, !rememberUser)
                        await trx.commit()
                        return res.status(200).json({ user, token});
                    }
                })
            }
        } catch(err) {
            await trx.rollback();
            return commonErros.internalServerError(res);
        }  
    }

    static async resetPassword(req: Request, res: Response) {
        const { email } = req.body
        const trx = await db.transaction()

        try {
            //verifying if user exists
            const user_id = await trx('users').select('__id').where('email', '=', email).first();
            if (!user_id){
                return res.status(400).json({error: 'nenhum usuario com este email foi encontrado'});
            }

            const userId = user_id.__id;
            const recoveryToken = generateToken(email, true, 3600);
            const ref_user = await trx('recovery_tokens')
                    .select('user_id')
                    .where('user_id', '=', userId)
                    .first()
            
            if(ref_user) { 
                await trx('recovery_tokens').update({token: recoveryToken}).where('user_id', '=', userId);
            } else {
                await trx('recovery_tokens').insert({ userId: userId, token: recoveryToken });
            }

            if (tokenTimer) clearTimeout(tokenTimer)

            tokenTimer = setTimeout( async () => await trx('recovery_tokens').delete('*').where('user_id', '=', userId), 3600000)

            sendMail(email, recoveryToken).then(async ()=> {
                await trx.commit();
                res.status(200).json({ status: 'ok'})
            })
            .catch(async () => {
                await trx.rollback()
                commonErros.internalServerError(res)
            })
        } catch(err) {
            await trx.rollback();
            return commonErros.internalServerError(res);
        } 
    }

    static async updatePassword(req: Request, res: Response) {
        const { token, new_password } = req.body
        const trx = await db.transaction()

        try {
            const ref_user = await trx('recovery_tokens')
                .select('*')
                .where('token', '=', token)
                .first()
            if (ref_user) {
                //verifying if given token is valid
                jwt.verify(token, secret, async (err: any) =>{
                    const user_id = ref_user.user_id

                    if (err) { return res.status(401).json({ error: "O token de recuperacao de senha expirou."})}
                    bcrypt.genSalt(10, async (_, salt) => {
                        const hashPassword = await bcrypt.hash(new_password, salt);

                        //Updating user password
                        await trx('users')
                            .where('__id', '=', user_id)
                            .update({ password: hashPassword})
                        
                        await trx('recovery_tokens')
                            .delete('*')
                            .where('user_id', '=', user_id)

                        await trx.commit()
                        return res.status(200).json({status: 'ok'})
                    })
                })
            } else {
                await trx.rollback();
                return res.status(400).json({ error: "Já foi realizado uma troca de senha com este token, ou o token é inválido." })
            }

        } catch(err) {
            await trx.rollback();
            return commonErros.internalServerError(res);
        } 
    }

}
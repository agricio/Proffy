import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './TeacherItem.css';

export interface Teacher {
        id: number;
        subject : string;
        cost : number;
        name : string;
        avatar : string;
        whatsapp : string;
        bio : string;
}

interface TeacherItemProps {
        teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function creacteNewConnection(){
        api.post('connections', {
            user_id: teacher.id,
        });

    }




    return (
        <article className="teacher-item">
        <header>
            <img src={teacher.avatar}alt="asds"/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>
        <p>{teacher.bio}</p>

        <footer>
            <p>
                Preco/hora
                <strong>{teacher.cost}</strong>
            </p>
            <a target='blank' href={`https://wa.me/${teacher.whatsapp}`}>
                <img src={whatsappIcon} alt="entrar em contato"/> Contato
            </a>
        </footer>
    </article>
    );
}

export default TeacherItem;
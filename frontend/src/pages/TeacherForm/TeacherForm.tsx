import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Input from '../../components/input/input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea/TextArea';
import Select from '../../components/Select/Select';

import './TeacherForm.css';


function TeacherForm() {
    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que voce quer dar aulas." 
                description="O primeiro passo é preencher esse formulario de incrição"
            />

        <main>
            <fieldset>
                <legend>Seus Dados</legend>
                <Input name="name" label="Nome Completo"/>
                <Input name="avatar" label="Avatar"/>
                <Input name="WhatsApp" label="WhatsApp"/>
                <Textarea name="bio" label="Biografia"/>
            </fieldset>
            <fieldset>
                <legend>Sobre a Aula</legend>
                <Select 
                    name="subject" 
                    label="Materia"
                    options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Ciencias', label: 'Ciencias' },
                        { value: 'Ed. fisica', label: 'Ed. fisica' },
                        { value: 'Fisica', label: 'Fisica' },
                        { value: 'Matematica', label: 'Matematica' },
                        { value: 'Quimica', label: 'Quimica' },
                    ]}
                    />
                <Input name="cost" label="Valor da hora/aula"/>
            </fieldset>
            <fieldset>
                <legend>
                    Horarios Disponiveis
                    <button>+ Novo Horario</button>
                </legend>

                <div className='schedule-item'>
                    <Select 
                        name="weeek_day" 
                        label="Dia da Semana"
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terca-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },    
                        ]}
                    />
                    <Input name="from" label="Das" type="time"/>
                    <Input name="to" label="As" type="time"/>

                </div>
                
            </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante" />
                    Importante! <br />
                    preencha todos os dados
                </p>
                <button type="button">Salbvar Cadastro</button>
            </footer>
        </main>

        </div>
        
    )
}

export default TeacherForm;
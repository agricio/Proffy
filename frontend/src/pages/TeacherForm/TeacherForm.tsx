import React, { FormEvent, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import Input from '../../components/input/input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea/TextArea';
import Select from '../../components/Select/Select';

import './TeacherForm.css';
import api from '../../services/api';


function TeacherForm() {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue( position: number, field: string, value: string ) {
        const updatedScheduleTtems = scheduleItems.map((scheduleItem, index) => {
            if (index === position){
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleTtems);

    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Casdastro Realizado COm Sucesso!');
        }).catch(()=> {
            alert('Erro no cadastro!');
        })

        console.log({
            name,
            avatar,
            bio,
            subject,
            cost,
            scheduleItems
        });
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrivel que voce quer dar aulas." 
                description="O primeiro passo é preencher esse formulario de incrição"
            />

        <main>
            <form onSubmit={ handleCreateClass }>
            <fieldset>
                <legend>Seus Dados</legend>
                <Input name="name" label="Nome Completo" value={name} onChange={(e) => { setName(e.target.value)}}/>
                <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value)}}/>
                <Input name="WhatsApp" label="WhatsApp"value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value)}}/>
                <Textarea name="bio" label="Biografia"value={bio} onChange={(e) => { setBio(e.target.value)}}/>
            </fieldset>
            <fieldset>
                <legend>Sobre a Aula</legend>
                <Select 
                    name="subject" 
                    label="Materia"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
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
                <Input name="cost" label="Valor da hora/aula" value={cost} onChange={(e) => { setCost(e.target.value)}}/>
            </fieldset>
            <fieldset>
                <legend>
                    Horarios Disponiveis
                    <button type="button" onClick={ addNewScheduleItem } >+ Novo Horario</button>
                </legend>

                {scheduleItems.map((scheduleItem, index )=> {
                    return(
                        <div key={scheduleItem.week_day }className='schedule-item'>
                        <Select 
                            name="week_day" 
                            label="Dia da Semana"
                            value={scheduleItem.week_day}
                            onChange={(e) => { setScheduleItemValue(index, 'week_day', e.target.value)}}
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
                        <Input 
                            name="from" 
                            label="Das" 
                            type="time" 
                            value={scheduleItem.from}
                            onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value)}} 
                        />

                        <Input 
                            name="to" 
                            label="As" 
                            type="time"
                            value={scheduleItem.to}
                            onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value)}} 
                        />
                    </div>
                    );
                })}    
            </fieldset>
            <footer>
                <p>
                    <img src={warningIcon} alt="Aviso importante" />
                    Importante! <br />
                    preencha todos os dados
                </p>
                <button type="submit">Salbvar Cadastro</button>
            </footer>
            </form>
        </main>

        </div>
        
    )
}

export default TeacherForm;
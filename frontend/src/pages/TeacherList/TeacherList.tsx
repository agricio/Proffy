import React, { FormEvent, useState } from 'react';
import Input from '../../components/input/input';
import PageHeader from '../../components/PageHeader/PageHeader';
import Select from '../../components/Select/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem/TeacherItem';
import searchIcon from '../../assets/images/icons/search.svg';


import './TeacherList.css'
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

   async function searchTeachers(e: FormEvent) {
        e.preventDefault();
        
      const response =  await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);

    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                <Select 
                    name="subject" 
                    label="Materia"
                    value={subject}
                    onChange={e => {setSubject(e.target.value)}}
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
                <Select 
                    name="weeek_day" 
                    label="Dia da Semana"
                    value={week_day}
                    onChange={e => {setWeek_day(e.target.value)}}
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
                        name="time" 
                        type="time" 
                        label="Horario"
                        value={time}
                        onChange={e => {setTime(e.target.value)}}
                    />
                    <button type='submit'>
                    <img src={searchIcon} alt="entrar em contato"/> 
                        Buscar
                    </button>
                </form>
                
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />

                })}
            </main>


        </div>
    )
}

export default TeacherList;
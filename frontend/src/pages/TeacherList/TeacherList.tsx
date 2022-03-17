import React from 'react';
import Input from '../../components/input/input';

import PageHeader from '../../components/PageHeader/PageHeader';
import Select from '../../components/Select/Select';
import TeacherItem from '../../components/TeacherItem/TeacherItem';

import './TeacherList.css'

function TeacherList() {
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis.">
                <form id="search-teachers">
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
                     <Input name="time" type="time" label="Horario"/>
                </form>
                
            </PageHeader>

            <main>
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
              
            </main>


        </div>
    )
}

export default TeacherList;
import React from 'react';

import PageHeader from '../../components/PageHeader/PageHeader';
import TeacherItem from '../../components/TeacherItem/TeacherItem';

import './TeacherList.css'

function TeacherList() {
    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis.">
                <form id="search-teachers">
                     <div className="input-block">
                        <label htmlFor="subject">Materia</label>
                        <input type="text" id="subject" />
                     </div>
                
                    <div className="input-block">
                        <label htmlFor="week_day">Dia da Semana</label>
                        <input type="text" id="week_day" />
                    </div>
                
                    <div className="input-block">
                        <label htmlFor="time">Horario</label>
                        <input type="text" id="time" />
                    </div>
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
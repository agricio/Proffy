import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './pages/lading/landingPage';
import TeacherList from './pages/TeacherList/TeacherList';
import TeacherForm from './pages/TeacherForm/TeacherForm';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LandingPage} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-class" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes;
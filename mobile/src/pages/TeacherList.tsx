import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../components/TeacherItem/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';

import PageHeader from '../components/PageHeader/PageHeader';


import api from '../services/api';

import styles from './TeacherListStyles';

function TeacherList () {
    const [isFiltersVisible, setIsFilterVisible] = useState(true);
    const [favorites, setFavorites] = useState<Number[]>([]);
    const [teachers, setTeachers ] = useState([]);
    const [subject, setSubject ] = useState('');
    const [week_day, setWeek_day ] = useState('');
    const [time, setTime ] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoriteTieachers = JSON.parse(response);
                const favoriteTeachersId = favoriteTieachers.map( (teacher: Teacher) => {
                    return teacher.id
                });

                setFavorites(favoriteTeachersId);
            }
        });
    }, []);
        
    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFiltersVisible);
    }

    async function handleFilterSubmit() {
        const response =  await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        console.log(response.data);
        handleToggleFiltersVisible();
    }


    return (
        <View style={styles.container}>
            <PageHeader 
                title= 'Proffys disponiveis'
                headerRigth={(
                    <BorderlessButton onPress={ handleToggleFiltersVisible } >
                        <Feather name='filter' size={20} color="#fff"/>
                    </BorderlessButton>
                )}
            >
                { isFiltersVisible && (
                    <MotiView 
                        style={styles.searchForm}
                        from={{
                            opacity: 0,
                            scaleY: 0

                        }}
                        animate={{
                            opacity:1,
                            scaleY: 1
                        }}
                        transition= {{
                            type: 'spring',
                            duration: 3000
                        }}
                        >
                        <Text style={styles.label}>Materia</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor='#c1bccc'
                            placeholder="Qual a materia?"
                            value={subject}
                            onChangeText={text => setSubject(text)} />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder="Qual o dia da semana?"
                                    value={week_day}
                                    onChangeText={Number => setWeek_day(Number)} />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder="Qual o horario?"
                                    value={time}
                                    onChangeText={text => setTime(text)} />
                            </View>
                        </View>
                        <RectButton 
                            style={styles.submitButton}
                            onPress={ handleFilterSubmit }>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </MotiView>
                )}
            </PageHeader>
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle= {{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }} 
            >
                {teachers.map((teacher: Teacher) => {
                    return( 
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={}
                        />)
                })}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;
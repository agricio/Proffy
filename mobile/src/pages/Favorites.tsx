//import React from 'expo-status-bar';
import React,{ useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../components/PageHeader/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem/TeacherItem';


import styles from './FavoritesStyles';




function Favorites () {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoriteTeachers = JSON.parse(response);

                setFavorites(favoriteTeachers);
            }
        });
    }

    useFocusEffect (() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader title= 'Meus Proffys Favoritos' />
            <ScrollView 
                style={styles.teacherList}
                contentContainerStyle= {{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }} 
            >
                {favorites.map((teacher: Teacher) => {
                    return(
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true} 
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;
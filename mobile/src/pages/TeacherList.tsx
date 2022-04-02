import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PageHeader from '../components/PageHeader/PageHeader';

import styles from './TeacherListStyles';


function TeacherList () {

    return (
        <View style={styles.container}>
            <PageHeader title= 'Proffys disponiveis' />
        </View>
    );
}

export default TeacherList;
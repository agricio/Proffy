import React from 'expo-status-bar';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PageHeader from '../components/PageHeader/PageHeader';

import styles from './FavoritesStyles';


function Favorites () {

    return (
        <View style={styles.container}>
            <PageHeader title= 'Meus Proffys Favoritos' />
        </View>
    );
}

export default Favorites;
import React from 'expo-status-bar';
import { Text, View , ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './GiveClassesStyles';

function Favorites () {
    const { goBack } = useNavigation();

    function handleNavigateGoBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
                <Text style={styles.okButtonText}>Favorites</Text>
        </View>
    );
}

export default Favorites;
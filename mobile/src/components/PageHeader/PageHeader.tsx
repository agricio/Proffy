import React, { ReactNode } from 'react';
import { View , Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './PageHeaderStyles';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';


interface PageHeaderProps {
    title: string;
    headerRigth?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children, headerRigth }) => {

    const { navigate } = useNavigation();

    function handleNavigateGoBack() {
        navigate('Landing');
    }
    
    return(
        <LinearGradient
            colors={['#8257E5', '#5C1180']}
            style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={handleNavigateGoBack}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoImg} resizeMode="contain" />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                { headerRigth }
            </View>
                { children }
        </LinearGradient>
    );
}

export default PageHeader;
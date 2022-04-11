import React, { useState, useEffect } from 'react';
import { Text, View , Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView, MotiImage, MotiText } from 'moti';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import landingImg from '../assets/images/landing.png';
import studyIcon from '../assets/images/icons/study.png';
import giveClassesIcon from '../assets/images/icons/give-classes.png';
import heartIcon from '../assets/images/icons/heart.png';
import logoIcon from '../assets/images/bigLogo.png';

import styles from './LandingStyles';
import api from '../services/api';

function Landing() {
    const [ totalConnections, setTotalConnections ] = useState(0);
    const navigation = useNavigation();

    function handleNavigateToGiveClassesPage() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyPages() {
        navigation.navigate('Study');
    }

    
    
    useEffect(() => { api.get('connections').then(response => { 
        const { total } = response.data;
        setTotalConnections(total);
    })},[]);


    return (
        <LinearGradient
            colors={['#8257E5', '#5C1180']}
            style={styles.container}>
            <MotiImage 
                style={styles.logo} 
                source={logoIcon}
                from={{
                    opacity: 0,
                    top: 300,
                }}
                animate={{
                     opacity:1,
                     top: 0,
                }}
                transition= {{
                type: 'timing',
                duration: 2000
                }}
            />
            <MotiImage  
                style={styles.banner} 
                source={landingImg}
                from={{
                    opacity: 0,
                    transform: [{ scale: 2 }],
                }}
                animate={{
                     opacity:1,
                     transform: [{ scale: 1 }],
                }}
                transition= {{
                type: 'timing',
                duration: 1800
                }} 
            />
            <MotiText 
                style={styles.title}
                from={{
                    opacity: 0,
                    left: 300,
                }}
                animate={{
                     opacity:1,
                     left: 0,
                }}
                transition= {{
                type: 'timing',
                duration: 2000
                }}
            >Seja bem-vindo! {'\n'}
                <Text style={styles.titleBold}>O que voce deseja fazer?</Text>
            </MotiText>
            <MotiView 
                style={styles.buttonsContainer}
                from={{
                    opacity: 0,
                    transform: [{ scale: 0 }],
                }}
                animate={{
                     opacity:1,
                     transform: [{ scale: 1 }],
                }}
                transition= {{
                type: 'spring',
                duration: 1000
                }}
            >
                <RectButton onPress={handleNavigateToStudyPages} style={[ styles.button, styles.buttonPrimary ]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton onPress={handleNavigateToGiveClassesPage} style={[ styles.button, styles.buttonSecondary ]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </MotiView >
            

            <MotiText 
                style={styles.totalConnections}
                from={{
                    opacity: 0,
                    right: 300,
                }}
                animate={{
                     opacity:1,
                     left: 0,
                }}
                transition= {{
                type: 'timing',
                duration: 4000
                }}> 
                Total de {totalConnections} coneccoes realizadas {' '}
                <MotiImage 
                    source={heartIcon}
                    from={{
                        transform: [{ scale: 0.6 }],
                    }}
                    animate={{
                         transform: [{ scale: 1 }],
                         
                         
                    }}
                    transition= {{
                    type: 'spring',
                    duration: 2600,
                    loop: true,
                    }} 
                />
            </MotiText >
        </LinearGradient>
    );
}

export default Landing;
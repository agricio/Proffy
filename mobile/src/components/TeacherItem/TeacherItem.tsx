import React, { useState } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HearOutLineIcon from '../../assets/images/icons/heart-outline.png'
import UnfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import WhatsappIcon from '../../assets/images/icons/whatsapp.png'


import styles from './TeacherItemStyles';
import api from '../../services/api';

export interface Teacher {
    id: number;
    subject : string;
    cost : number;
    name : string;
    avatar : string;
    whatsapp : string;
    bio : string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp () {
        api.post('connections', {user_id: teacher.id});

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite(){

        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if(isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(true); 

        } else {
            favoritesArray.push(teacher);

            setIsFavorited(true); 
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar} 
                    source={{uri: teacher.avatar}} 
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{teacher.bio}</Text>
                <View style={styles.footer}>
                    <View style={styles.allPrice}>
                        <Text style={styles.price}>Preco/hora{'   '}</Text>
                        <Text style={styles.priceValue}>{teacher.cost}</Text>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <RectButton 
                            onPress={handleToggleFavorite} 
                            style={[styles.favoriteButton, isFavorited ? styles.favoritedButton : {}, ]}>
                            { isFavorited ? <Image source={HearOutLineIcon}/> : <Image source={UnfavoriteIcon}/> }
                            </RectButton>
                        <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                            <Image source={WhatsappIcon}/>
                            <Text style={styles.contactButtonText}>Entrar em contato</Text>
                        </RectButton>
                    </View>
                </View>
        </View>
            
    );
}

export default TeacherItem;


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherList from '../src/pages/TeacherList';
import Favorites from '../src/pages/Favorites';
import { Ionicons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    heigth:64,
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                iconStyle:{
                    flex: 0,
                    width: 20,
                    heigth: 20,
                    top: -25
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                inactiveBackgroudColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d',

            }}
            >
            <Screen 
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ({ color, size}) => {
                        return (
                            <Ionicons size={size} color={color} name="ios-easel" />
                        );
                    }
                }}
                name="TeacherList" 
                component={TeacherList}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size}) => {
                        return (
                            <Ionicons size={size} color={color} name="ios-heart" />
                        );
                    }
                }}
            />
        </Navigator>

    );
}

export default StudyTabs;
import React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherList from '../src/pages/TeacherList';
import Favorites from '../src/pages/Favorites';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import { Ionicons } from '@expo/vector-icons';

const Tabs = AnimatedTabBarNavigator();

function StudyTabsFloat() {
    return (

      <Tabs.Navigator
        tabBarOptions={{
          inactiveBackgroudColor: '#fafafc',
          activeBackgroundColor: '#04d361',
          activeTintColor: '#fff',
          
        }}
        
        appearance={{
          floating: true,
          shadow: true,
          dotSize: "small",
          whenActiveShow: "label-only",
          tabBarBackground: 'rgbargba(87, 75, 99, 0.8)',
          
        }}>
        <Tabs.Screen
          name="TeacherList"
          component={TeacherList}
          options={{
            tabBarIcon: () => (
                <Ionicons
                    name="ios-easel"
                    size={25}
                    color= {'#E5DDEB'}
                    focused="focused"
                />
            )
          }}
        />

        <Tabs.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: () => (
                <Ionicons
                    name="ios-heart"
                    size={25}
                    color= {'#E5DDEB'}
                    focused="focused"
                />
            )
          }}
        />
        
        </Tabs.Navigator>
    );
}

export default StudyTabsFloat;
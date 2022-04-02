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
          whenActiveShow: "label-only",
        }}
      >
        <Tabs.Screen
          name="TeacherList"
          component={TeacherList}
          options={{
            tabBarIcon: () => (
                <Ionicons
                    name="ios-easel"
                    size={25}
                    color= {'#7361B0'}
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
                    color= {'#7361B0'}
                    focused="focused"
                />
            )
          }}
        />
        
        </Tabs.Navigator>
    );
}

export default StudyTabsFloat;
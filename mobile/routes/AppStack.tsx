import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from '../src/pages/Landing'
import GiveClasses from '../src/pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createNativeStackNavigator();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Landing' component={Landing}/>
                <Screen name='GiveClasses' component={GiveClasses}/>
                <Screen name='Study' component={StudyTabs}/>
            </Navigator>
        </NavigationContainer>

    );
}

export default AppStack;
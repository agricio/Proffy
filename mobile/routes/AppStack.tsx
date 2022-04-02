import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

import Landing from '../src/pages/Landing'
import GiveClasses from '../src/pages/GiveClasses';
//import StudyTabs from './StudyTabs';
import StudyTabsFloat from './StudyTabsFloat';

const { Navigator, Screen } = createStackNavigator ();

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='Landing' component={Landing}/>
                <Screen name='GiveClasses' component={GiveClasses}/>
                <Screen name='Study' component={StudyTabsFloat}/>
            </Navigator>
        </NavigationContainer>

    );
}

export default AppStack;
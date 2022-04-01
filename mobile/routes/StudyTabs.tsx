import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TeacherList from "../src/pages/TeacherList";
import Favorites from "../src/pages/Favorites";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator>
            <Screen name="TeacherList" component={TeacherList}/>
            <Screen name="Favorites" component={Favorites}/>
        </Navigator>

    );
}

export default StudyTabs;
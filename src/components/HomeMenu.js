import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import Usuarios from "../screens/Usuarios"
import NewPost from "../screens/NewPost"
import AntDesign from '@expo/vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return(
        <>
            <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
                <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}} />
                <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <AntDesign name="user" size={24} color="black" />}}/>
                <Tab.Screen name="Usuarios" component={Usuarios} options={{ tabBarIcon: () => <AntDesign name="meho" size={24} color="black" />}}/>
                <Tab.Screen name="NewPost" component={NewPost} options={{ tabBarIcon: () => <AntDesign name="totop" size={24} color="black" />}}/>
            </Tab.Navigator>
        </>
    )
}

export default HomeMenu
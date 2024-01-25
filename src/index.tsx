import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './Containers';


type MainNavigatorParamsList = {
    BottomTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="BottomTabNavigator"
                    component={BottomTabNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default MainNavigator;

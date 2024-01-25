import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    BugsListScreen,
    BugsDetailedScreen,
} from './Screens';
import { BugObject } from '../NewTicketsTab/Screens/NewBugScreen/types';

export type HomeStackParamsList = {
    BugsListScreen: undefined;
    BugsDetailedScreen: {
        bug: BugObject;
        index: number;
    };
};

const Stack = createNativeStackNavigator<HomeStackParamsList>();

export function MainTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="BugsListScreen"
                component={BugsListScreen}
            />
            <Stack.Screen
                name="BugsDetailedScreen"
                component={BugsDetailedScreen}
            />
        </Stack.Navigator>
    );
}

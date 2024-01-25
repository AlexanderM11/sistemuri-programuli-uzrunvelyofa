import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    NewBugScreen,
} from './Screens';

export type NewBugStackParamsList = {
    NewBugScreen: undefined;
    MainTab: {
        screen: 'BugsListScreen';
    }
};

const Stack = createNativeStackNavigator<NewBugStackParamsList>();

export function NewTicketsTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="NewBugScreen"
                component={NewBugScreen}
            />
        </Stack.Navigator>
    );
}

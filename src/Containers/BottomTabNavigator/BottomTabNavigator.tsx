import React from 'react';
import { Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabIcon, PlusIconWithBackground } from '../../../src/Components';
import { NewTicketsTab } from './NewTicketsTab';
import { MainTab } from './MainTab';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { colors } from '../../../src/Theme';

type BottomTabNavigatorParamsList = {
    PrescriptionStack: undefined;
    MainTab: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamsList>();

type tabBarLabelType = {
    navigationOptions: {
        focused: boolean;
        color: string;
        position: LabelPosition;
    };
    text: string;
};

const TabBarLabel = ({ navigationOptions, text }: tabBarLabelType) => {
    return (
        <Text
            style={{
                color: navigationOptions.color,
                fontSize: Platform.OS === 'ios' ? 12 : 9,
                textAlign: 'center',
                paddingBottom: 3,
            }}
        >
            {text}
        </Text>
    );
};

export function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: colors.invert200,
                tabBarActiveTintColor: colors.primaryMain,
                tabBarInactiveBackgroundColor: colors.whiteMain,
                tabBarActiveBackgroundColor: colors.whiteMain,
                tabBarStyle: {
                    backgroundColor: colors.whiteMain,
                    borderTopColor: colors.invert25,
                    borderTopWidth: 0.5,
                },
            }}
        >
            <BottomTab.Screen
                name="MainTab"
                component={MainTab}
                options={{
                    tabBarLabel: (nav) => (
                        <TabBarLabel
                            navigationOptions={nav}
                            text={'Main'}
                        />
                    ),
                    tabBarIcon: ({ focused }) => {
                        return (
                            <HomeTabIcon
                                color={
                                    focused
                                        ? colors.primaryMain
                                        : colors.invert200
                                }
                                width={28}
                                height={28}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name="PrescriptionStack"
                component={NewTicketsTab}
                options={{
                    tabBarLabel: (nav) => (
                        <TabBarLabel
                            navigationOptions={nav}
                            text={'New'}
                        />
                    ),
                    tabBarIcon: ({ focused }) => {
                        return (
                            <PlusIconWithBackground
                                color={
                                    focused
                                        ? colors.primaryMain
                                        : colors.invert200
                                }
                                width={28}
                                height={28}
                            />
                        );
                    },
                }}
            />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;

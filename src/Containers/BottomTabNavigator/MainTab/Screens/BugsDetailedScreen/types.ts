import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../../../MainTab/MainTab';
import { StatusType } from '../../../NewTicketsTab/Screens/NewBugScreen/types';
export type BugsDetailedScreenNavigationProps = NativeStackScreenProps<
    HomeStackParamsList,
    'BugsDetailedScreen'
>;

export type BugsDetailedScreenPropsType = {
    navigation: BugsDetailedScreenNavigationProps['navigation'];
    route: BugsDetailedScreenNavigationProps['route'];
};

export type BugListStatusObject = { id: number, value: StatusType }
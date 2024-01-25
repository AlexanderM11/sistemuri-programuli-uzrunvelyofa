import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NewBugStackParamsList } from '../../NewTicketsTab';

type NewBugScreenNavigationProps = NativeStackScreenProps<
NewBugStackParamsList,
    'NewBugScreen'
>;

export type NewBugScreenPropsType = {
    navigation: NewBugScreenNavigationProps['navigation'];
    route: NewBugScreenNavigationProps['route'];
};

export type DeveloperObjectType = {
    id: number;
    name: string; 
    lastName: string;
    AvatarBackgroundColor: string;
};

export type BugSeverityType = {
    id: number;
    name: string;
    color: string;
};

export type BugsImageObject = { 
    id?: number;
    uri?: string;
    base64?: string | null;
    type?: string | null;
};

export type StatusType = 'BackLog' | 'InProgress' | 'InTesting' | 'Done';

export type BugObject = { 
    bugTitle: string;
    bugDescription: string;
    chosenDeveloper: DeveloperObjectType,
    bugSeverity: BugSeverityType,
    bugImages: BugsImageObject[],
    status: StatusType,
}

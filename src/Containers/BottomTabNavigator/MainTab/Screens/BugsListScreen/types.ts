import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamsList } from '../../MainTab';

type PersonalInformationScreenNavigationProps = NativeStackScreenProps<
    HomeStackParamsList,
    'BugsListScreen'
>;

export type SettingsScreenPropsType = {
    navigation: PersonalInformationScreenNavigationProps['navigation'];
    route: PersonalInformationScreenNavigationProps['route'];
};

export type PersonalInfoFormProps = {
    firstName: string;
    lastName: string;
    personalId: string;
    mobileInput: { mobileIndex: MobileIndexType; text: string };
    email: string;
    birthDay: Date | null;
    iban: string;
};

export type PersonalInfoToBackendType = {
    iban: string;
    email: string;
    phone_number?: string;
    phone_index_id?: number;
    verification_code?: string;
};

export type MobileIndexType = {
    id: number;
    phone_index: string;
    iso_code: string;
    length_limit: number;
    country_name: string;
};

export type VerificationCodeParamsType = {
    phone_index_id: number;
    phone_number: string;
    sms_type: 'phone_number_update';
};

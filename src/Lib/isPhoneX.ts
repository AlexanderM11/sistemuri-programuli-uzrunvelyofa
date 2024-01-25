import { Platform, Dimensions } from 'react-native';
export const isIphoneX = () => {
    const height = Dimensions.get('window').height;
    return (
        Platform.OS === 'ios' &&
        (height === 812 ||
            height === 896 ||
            height === 844 ||
            height === 926 ||
            height === 852 ||
            height === 844 ||
            height === 932)
    );
};
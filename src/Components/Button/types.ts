export type ButtonProps = {
    title: string;
    onPress: () => void;
    leftIcon?: 'arrowRefresh' | 'plus';
    rightIcon?:
        | 'arrowForward'
        | 'arrowForwardBold'
        | 'plus'
        | 'logout'
        | 'forward'
        | 'diagnoseIcon'
        | 'ReuseIcon';
    type?: 'primary' | 'secondary' | 'secondaryRed';
    iconColor?: string;
    disabled?: boolean;
    isLoading?: boolean;
    activityIndicatorColor?: string;
    style?: any;
    fontFamily?:
        | 'regular'
        | 'medium'
        | 'semiBold'
        | 'bold'
        | 'boldItalic'
        | 'eBoldItalic';
    titleUppercase?: boolean;
    iconStrokeColor?: string;
    cantPress?: boolean;
    titleColor?: string;
    titleSize?: number;
};

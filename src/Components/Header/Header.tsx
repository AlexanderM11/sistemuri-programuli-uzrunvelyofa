import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    StyleProp,
    Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from '../../../src/Lib';
import {
    ArrowBackIcon,
    HeaderCloseIcon,
    HeaderAccountIcon,
} from '../../../src/Components';
import { colors } from '../../../src/Theme';

type headerPropsType = {
    headerLeft?:
    | 'backButton'
    | 'closeIcon' | 'headerAccountIcon';
    title?: string;
    headerRight?: 'closeIcon' | 'backButton' | '';
    goBackFunction?: () => void;
    closeFunction?: () => void;
    headerTitleSize?: number;
    isModal?: boolean;
    titleUppercase?: boolean;
    style?: StyleProp<ViewStyle>;
    borderBottomLeftRadius?: number;
    underBackgroundColor?: string;
};

export const Header = (props: headerPropsType) => {
    const {
        headerLeft,
        title,
        headerTitleSize,
        headerRight,
        goBackFunction,
        closeFunction,
        isModal,
        titleUppercase,
        style,
        underBackgroundColor,
    } = props;
    const navigation = useNavigation();

    const RenderHeaderLeft = () => {
        switch (headerLeft) {
            case 'backButton':
                return (
                    <TouchableOpacity
                        style={styles.headerLeftContainer}
                        onPress={
                            goBackFunction
                                ? goBackFunction
                                : () => navigation.goBack()
                        }
                    >
                        <ArrowBackIcon />
                    </TouchableOpacity>
                );
            case 'closeIcon':
                return (
                    <TouchableOpacity
                        style={styles.headerLeftContainer}
                        onPress={closeFunction}
                    >
                        <HeaderCloseIcon />
                    </TouchableOpacity>
                );
            case 'headerAccountIcon':
                return (
                    <TouchableOpacity
                        style={styles.headerLeftContainer}
                        onPress={closeFunction}
                    >
                        <HeaderAccountIcon />
                    </TouchableOpacity>
                );
        }
        return <View style={styles.emptyContainerStyle} />;
    };

    const RenderHeaderRight = () => {
        switch (headerRight) {
            case 'closeIcon':
                return (
                    <TouchableOpacity
                        onPress={closeFunction}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <HeaderCloseIcon />
                    </TouchableOpacity>
                );
            case 'backButton':
                return (
                    <TouchableOpacity
                        style={styles.headerLeftContainer}
                        onPress={
                            goBackFunction
                                ? goBackFunction
                                : () => navigation.goBack()
                        }
                    >
                        <ArrowBackIcon />
                    </TouchableOpacity>
                );
        }
        return <View style={styles.emptyContainerStyle} />;
    };

    return (
        <View
            style={[
                styles.mainComponentContainer,
                {
                    backgroundColor: underBackgroundColor
                        ? underBackgroundColor
                        : undefined,
                },
                { marginTop: isModal ? 20 : isIphoneX() ? 50 : 20 },
            ]}
        >
            <View style={[styles.componentContainer, style]}>
                <View style={styles.headerCenterStyle}>
                    <RenderHeaderLeft />
                    <Text
                        style={[
                            {
                                textTransform: titleUppercase
                                    ? 'uppercase'
                                    : 'none',
                            },
                            {
                                fontSize: headerTitleSize
                                    ? headerTitleSize
                                    : 16,
                                color: colors.invert300,
                            },
                            styles.titleStyle
                        ]}
                    >
                        {title}
                    </Text>
                </View>
                <RenderHeaderRight />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainComponentContainer: {
        minHeight: 50,
    },
    componentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 50,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerCenterStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emptyContainerStyle: {
        // flex: 1
    },
    headerLeftContainer: {
        marginRight: 12,
    },
    titleStyle: {
        fontWeight: "800",
    },
});

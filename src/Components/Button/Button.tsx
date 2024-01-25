import React, { useContext } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    ActivityIndicator,
    Text
} from 'react-native';
import { colors } from '../../../src/Theme';
import * as types from './types';

export const Button = (props: types.ButtonProps) => {
    const {
        onPress,
        title,
        type,
        disabled,
        isLoading,
        activityIndicatorColor,
        style,
        fontFamily,
        titleUppercase,
        cantPress,
        titleColor,
        titleSize,
    } = props;

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.buttonContainer,
                cantPress
                    ? {
                        backgroundColor: colors.invert25,
                        borderColor: colors.invert150,
                        borderWidth: 1,
                    }
                    : type === 'primary'
                        ? { backgroundColor: colors.primaryMain }
                        : type === 'secondary'
                            ? {
                                backgroundColor: colors.invertLayer,
                                borderColor: colors.primaryMain,
                                borderWidth: 1,
                            }
                            : {
                                backgroundColor: colors.invertLayer,
                                borderColor: colors.redMain,
                                borderWidth: 1,
                            },
                style,
            ]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator
                    color={
                        activityIndicatorColor
                            ? activityIndicatorColor
                            : type === 'primary'
                                ? colors.whiteMain
                                : type === 'secondary'
                                    ? colors.primaryMain
                                    : colors.redMain
                    }
                />
            ) : (
                <View style={styles.innerContainerStyle}>
                    <Text
                        style={[
                            styles.titleStyle,
                            cantPress
                                ? { color: colors.invert150 }
                                : type === 'primary'
                                    ? { color: colors.whiteMain }
                                    : type === 'secondary'
                                        ? { color: colors.primaryMain }
                                        : { color: colors.redMain },
                            {
                                fontFamily,
                            },
                            titleUppercase && styles.transform,
                            titleColor ? { color: titleColor } : undefined,
                            titleSize ? { fontSize: titleSize } : undefined,
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    innerContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIconContainer: {
        marginRight: 7,
    },
    rightIconContainer: {
        marginLeft: 7,
    },
    titleStyle: {
        marginHorizontal: 7,
        fontWeight: '800'
    },
    transform: {
        textTransform: 'uppercase',
    },
});

Button.defaultProps = {
    type: 'primary',
};

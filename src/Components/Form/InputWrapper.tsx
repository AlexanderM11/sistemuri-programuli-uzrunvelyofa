import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { colors } from '../../../src/Theme';
import { isEmpty } from 'lodash';

type InputWrapperProps = {
    error?: any;
    isTouched?: boolean;
    placeholder?: string;
    children: React.ReactNode;
    max?: number;
    min?: number;
    maxLength?: number;
    minLength?: number;
    isMobileInput?: boolean;
    value: string;
    editable?: boolean;
    type?: string;
    style?: any;
    extendable?: boolean;
    required?: boolean;
};

export const InputWrapper = (props: InputWrapperProps) => {
    const {
        error,
        children,
        placeholder,
        max,
        min,
        maxLength,
        minLength,
        isMobileInput,
        value,
        editable,
        type,
        style,
        extendable,
    } = props;

    const renderErrorMessage = (tp: string | undefined) => {
        switch (tp) {
            case 'required':
                return 'Field is required';
            case 'mobileInput':
                return 'Field is required';
            case 'min':
                return `Min value is ${min}`;
            case 'max':
                return `Max value is ${max}`;
            case 'minLength':
                return `Min length is ${minLength}`;
            case 'maxLength':
                return `Max length is ${maxLength}`;
            default:
                return '';
        }
    };

    return (
        <>
            <View
                style={[
                    styles.container,
                    !editable && { backgroundColor: colors.invert5 },
                    (value === '' || isEmpty(value)) &&
                    type !== 'textArea' && {
                        height:
                            Platform.OS === 'ios'
                                ? 55
                                : type === 'mobileInput'
                                    ? 61
                                    : 64,
                        justifyContent: 'center',
                    },
                    { ...style },
                    extendable ? { minHeight: 55 } : { height: 55 },
                ]}
            >
                {!isMobileInput &&
                    value !== '' &&
                    type !== 'datePicker' &&
                    type !== 'select' &&
                    !isEmpty(value) && (
                        <Text style={styles.labelStyle}>{placeholder}</Text>
                    )}
                {children}
            </View>
            {(error?.message || error?.type) && (
                <Text style={styles.errorStyle}>
                    {error?.message
                        ? error.message
                        : renderErrorMessage(error?.type as string)}
                </Text>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: colors.invert25,
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    labelStyle: {
        fontSize: 11,
        color: colors.invert150,
        marginLeft: Platform.OS === 'ios' ? 0 : 4,
    },
    errorStyle: {
        color: 'rgba(255, 0, 0, .6)',
        marginTop: 5,
        marginLeft: 20,
    },
});

InputWrapper.defaultProps = {
    editable: true,
};

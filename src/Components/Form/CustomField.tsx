import React, { useState } from 'react';
import { Controller, UseFormSetValue, UseFormSetError } from 'react-hook-form';
import {
    TextInput,
    StyleSheet,
    View,
    KeyboardTypeOptions,
    Platform,
    Text,
} from 'react-native';
import { InputWrapper } from './InputWrapper';
import {
    SelectComponent,
} from '../../../src/Components';
import { colors } from '../../../src/Theme';
import { isEmpty } from 'lodash';
import { SelectIdValueType } from '../SelectComponent/types';

type pattern = {
    value: RegExp;
    message: string;
};

export type SelectedValueType = {
    id: number;
    name: string;
    code?: string;
    code_with_name?: string;
    type: string;
};

type CustomFieldProps = {
    inputContainerStyle?: object;
    type: string;
    placeHolder: string;
    control: any;
    name: string;
    required?: boolean;
    pattern?: pattern;
    validate?: any;
    max?: number;
    min?: number;
    maxLength?: number;
    minLength?: number;
    keyboardType?: KeyboardTypeOptions;
    setValue?: UseFormSetValue<any>;
    setError: UseFormSetError<any>;
    editable?: boolean;
    shouldSaveIndex?: boolean;
    disabled?: boolean;
    renderSelectItem?: (
        item: any,
        disabled?: boolean,
        fontSize?: number,
        detailedInformation?: boolean,
        key?: number,
    ) => React.ReactNode;
    staticList?: Array<SelectedValueType | SelectIdValueType | Rule>;
    route?: string;
    selectHeaderLeftIcon:
    | 'backButton'
    | 'diagnoseIcon'
    | 'appealIcon'
    | 'globusIcon'
    | 'headerAccountIcon'
    | 'medicamentIcon'
    | 'phoneIcon'
    | 'DiplomaIcon'
    | '';
    modalTitle?: string;
    selectedTitle?: string;
    mustBeSelected?: boolean;
    additionalButtonTitle?: string;
    additionalButtonFunction?: () => void;
    minDate?: Date;
    maxDate?: Date;
    defaultSelection?: Date;
    beforeSelect?: () => void;
};

export type PeriodicityType = {
    id: number;
    name: string;
    meta: FrequencyMeta;
};

export type FrequencyMeta = {
    rules: Rule[];
};

export type Rule = {
    id: number;
    name: string;
};

export const CustomField = (props: CustomFieldProps) => {
    const {
        inputContainerStyle,
        type,
        placeHolder,
        control,
        name,
        keyboardType,
        editable,
        disabled,
        renderSelectItem,
        staticList,
        route,
        selectHeaderLeftIcon,
        modalTitle,
        selectedTitle,
        mustBeSelected,
        additionalButtonTitle,
        additionalButtonFunction,
        minDate,
        maxDate,
        defaultSelection,
        required,
        beforeSelect,
    } = props;
    const [passwordSecureEntry, setPasswordSecureEntry] =
        useState<boolean>(true);

    const selectComponentValidation: any = (value: SelectedValueType) => {
        let valid: boolean = true;
        let validationText: string = '';

        if (isEmpty(value) && mustBeSelected) {
            valid = false;
            validationText = 'Field is required';
        }
        return { valid, validationText };
    };

    const fieldComponent = () => {
        switch (type) {
            case 'text':
                return (
                    <Controller
                        control={control}
                        name={name}
                        rules={{
                            ...props,
                        }}
                        render={({
                            field: { onChange, value, ref },
                            formState: { errors },
                            fieldState: { isTouched },
                        }) => (
                            <InputWrapper
                                value={value}
                                editable={editable}
                                isTouched={isTouched}
                                placeholder={`${placeHolder} ${required ? '*' : ''
                                    }`}
                                error={errors[name]}
                                {...props}
                            >
                                <TextInput
                                    editable={editable}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCorrect={false}
                                    ref={ref}
                                    style={styles.textInputBorderStyle}
                                    keyboardType={keyboardType}
                                    placeholder={`${placeHolder} ${required ? '*' : ''
                                        }`}
                                    placeholderTextColor={colors.invert150}
                                />
                            </InputWrapper>
                        )}
                    />
                );
            case 'textArea':
                return (
                    <Controller
                        control={control}
                        name={name}
                        rules={{
                            ...props,
                        }}
                        render={({
                            field: { onChange, value, ref },
                            formState: { errors },
                            fieldState: { isTouched },
                        }) => (
                            <InputWrapper
                                value={value}
                                isTouched={isTouched}
                                placeholder={`${placeHolder} ${required ? '*' : ''
                                    }`}
                                error={errors[name]}
                                {...props}
                                extendable={true}
                            >
                                <TextInput
                                    editable={editable}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCorrect={false}
                                    ref={ref}
                                    style={styles.textArea}
                                    keyboardType={keyboardType}
                                    multiline
                                    placeholder={`${placeHolder} ${required ? '*' : ''
                                        }`}
                                    placeholderTextColor={colors.invert150}
                                    scrollEnabled={false}
                                />
                            </InputWrapper>
                        )}
                    />
                );
            case 'number':
                return (
                    <Controller
                        control={control}
                        name={name}
                        rules={{
                            pattern: {
                                value: /^[0-9]*$/i,
                                message: 'Invalid Field',
                            },
                            ...props,
                        }}
                        render={({
                            field: { onChange, value, ref },
                            formState: { errors },
                            fieldState: { isTouched },
                        }) => (
                            <InputWrapper
                                value={value}
                                isTouched={isTouched}
                                placeholder={`${placeHolder} ${required ? '*' : ''
                                    }`}
                                error={errors[name]}
                                {...props}
                            >
                                <TextInput
                                    editable={editable}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCorrect={false}
                                    ref={ref}
                                    style={styles.textInputBorderStyle}
                                    keyboardType={keyboardType}
                                    placeholder={`${placeHolder} ${required ? '*' : ''
                                        }`}
                                    placeholderTextColor={colors.invert150}
                                />
                            </InputWrapper>
                        )}
                    />
                );
            case 'decimal':
                return (
                    <Controller
                        control={control}
                        name={name}
                        rules={{
                            pattern: {
                                value: /^\d+(\.\d+)?$/i,
                                message: 'Invalid format',
                            },
                            ...props,
                        }}
                        render={({
                            field: { onChange, value, ref },
                            formState: { errors },
                            fieldState: { isTouched },
                        }) => (
                            <InputWrapper
                                value={value}
                                isTouched={isTouched}
                                placeholder={`${placeHolder} ${required ? '*' : ''
                                    }`}
                                error={errors[name]}
                                {...props}
                            >
                                <TextInput
                                    editable={editable}
                                    onChangeText={onChange}
                                    value={value}
                                    autoCorrect={false}
                                    ref={ref}
                                    style={styles.textInputBorderStyle}
                                    keyboardType="decimal-pad"
                                    placeholder={`${placeHolder} ${required ? '*' : ''
                                        }`}
                                    placeholderTextColor={colors.invert150}
                                />
                            </InputWrapper>
                        )}
                    />
                );

            case 'select':
                return (
                    <Controller
                        control={control}
                        name={name}
                        rules={{
                            ...props,
                            validate: (value: SelectedValueType) => {
                                let validationText =
                                    selectComponentValidation(value);
                                return validationText?.valid
                                    ? null
                                    : validationText.validationText;
                            },
                            required: props.required,
                        }}
                        render={({
                            field: { onChange, value },
                            formState: { errors },
                        }) => (
                            <View>
                                {renderSelectItem &&
                                    modalTitle &&
                                    selectedTitle && (
                                        <SelectComponent
                                            renderItem={renderSelectItem}
                                            route={route}
                                            afterSelect={onChange}
                                            beforeSelect={beforeSelect}
                                            modalTitle={modalTitle}
                                            selectedItem={value}
                                            selectedTitle={selectedTitle}
                                            headerLeftIcon={
                                                selectHeaderLeftIcon ?? ''
                                            }
                                            staticList={
                                                staticList &&
                                                    staticList.length > 0
                                                    ? staticList
                                                    : undefined
                                            }
                                            additionalButtonTitle={
                                                additionalButtonTitle
                                            }
                                            additionalButtonFunction={
                                                additionalButtonFunction
                                            }
                                            required={required}
                                        />
                                    )}
                                {errors &&
                                    errors[name] &&
                                    (errors[name]?.type === 'required' ? (
                                        <Text style={styles.errorStyle}>
                                            Field is required
                                        </Text>
                                    ) : (
                                        errors[name]?.message ? (
                                            <Text style={styles.errorStyle}>
                                                {errors[name].message}
                                            </Text>
                                        ) : undefined
                                    ))}
                            </View>
                        )}
                    />
                );
            default:
                return (
                    <Text
                        style={styles.notFoundText}
                    >{`Input with type "${type}" not found.`}</Text>
                );
        }
    };

    return (
        <View style={[styles.inputContainer, inputContainerStyle]}>
            {fieldComponent()}
        </View>
    );
};

const styles = StyleSheet.create({
    textInputBorderStyle: {
        width: '100%',
        paddingVertical: 3,
        fontSize: 14,
        color: colors.invert400,
        fontFamily: 'GraphikGeorgian-Medium',
        height: 30,
    },
    inputContainer: {
        marginBottom: 16,
    },
    passwordCheckButton: {
        position: 'absolute',
        right: 5,
        top: 18,
    },
    textArea: {
        borderRadius: 20,
        textAlignVertical: 'top',
        paddingVertical: Platform.OS === 'ios' ? 15 : 5,
        marginTop: 5,
        color: colors.invert400,
        fontFamily: 'GraphikGeorgian-Medium',
    },
    notFoundText: {
        color: colors.blackMain,
    },
    errorStyle: {
        color: 'rgba(255, 0, 0, .6)',
        marginTop: 5,
        marginLeft: 20,
    },
});

CustomField.defaultProps = {
    editable: true,
    selectHeaderLeftIcon: '',
};

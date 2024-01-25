import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
    HeaderCloseIcon,
    CustomAlert,
    GaleryIcon,
    UploaderIcon
} from '../../../src/Components';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { colors } from '../../../src/Theme';
import * as types from './types';

const mediaType: MediaType = 'photo' as MediaType;
const options = {
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    maxWidth: 800,
    maxHeight: 800,
    mediaType: mediaType,
    mediaTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    includeBase64: true,
};

export const GaleryImageUploader = (
    props: types.GaleryImageUploaderPropsType,
) => {
    const {
        uploaderTitle,
        required,
        disabled,
        errorsCount,
        filesArray,
        setFilesArray,
        setEditableExperience,
        showErrors,
        maxFilesNumber,
        maxFilesNumberError,
        onComponentPress,
    } = props;
    const [alertIsOpen, setAlertIsOpen] = useState<boolean>(false);
    const [alertText, setAlertText] = useState<string>('');

    const removeFile = useCallback(
        (index: number) => {
            let tempArray = filesArray.filter(
                (item, itemNumber) => index !== itemNumber,
            );
            if (setFilesArray) {
                setFilesArray(tempArray);
            }
        },
        [filesArray, setFilesArray],
    );

    const uploadImage = () => {
        if (onComponentPress) {
            onComponentPress();
        }
        if (
            maxFilesNumber &&
            maxFilesNumber === filesArray.length &&
            maxFilesNumberError
        ) {
            setAlertText(maxFilesNumberError);
            setAlertIsOpen(true);
            return;
        }
        launchImageLibrary(options, async (res) => {
            if (res && res?.errorCode && res?.errorMessage) {
                setAlertText('Try again');
                setAlertIsOpen(true);
                return;
            } else {
                if (!res.didCancel && res.assets) {
                    setFilesArray([
                        ...filesArray,
                        {
                            name: res.assets[0].fileName,
                            uri: res.assets[0].uri,
                            type: res.assets[0].type,
                            base64: res.assets[0].base64,
                        },
                    ]);
                }
            }
        })
            ;
    };

    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                style={[
                    disabled
                        ? styles.disabledFileUploaderContainer
                        : styles.fileUploaderContainer,
                    errorsCount > 1 && { backgroundColor: colors.red5 },
                ]}
                onPress={uploadImage}
            >
                <View style={styles.iconAndTitleContainer}>
                    <GaleryIcon />
                    <Text style={styles.titleStyle}>
                        {uploaderTitle} {required ? '*' : ''}
                    </Text>
                </View>
                {!disabled && <UploaderIcon />}
            </TouchableOpacity>
            {filesArray?.length > 0 && (
                <View
                    style={
                        disabled
                            ? styles.disabledUploadedDocumentsContainer
                            : styles.uploadedDocumentsContainer
                    }
                >
                    {filesArray.map((item, index) => {
                        return (
                            <View key={index.toString()}>
                                <View style={styles.documentContainer}>
                                    <View style={styles.imageAndTitleContainer}>
                                        <GaleryIcon />
                                        <Text
                                            style={[
                                                styles.documentTitle
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        disabled={disabled}
                                        onPress={() => removeFile(index)}
                                    >
                                        {!disabled && <HeaderCloseIcon />}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}
            <CustomAlert
                showModal={alertIsOpen}
                closeModal={() => setAlertIsOpen(false)}
                bodyText={alertText}
                confirmButtonTitle={'Get it'}
            />
        </>
    );
};

const styles = StyleSheet.create({
    fileUploaderContainer: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.primary5,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.invert25,
    },
    disabledFileUploaderContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blue5,
    },
    iconAndTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.75,
    },
    titleStyle: {
        color: colors.invert400,
        fontSize: 12,
        fontFamily: 'semiBold',
        marginLeft: 10,
    },
    uploadedDocumentsContainer: {
        marginHorizontal: 16,
    },
    disabledUploadedDocumentsContainer: {
        marginHorizontal: 0,
    },
    documentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.invert25,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        marginTop: 10,
    },
    imageAndTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.75,
    },
    documentTitle: {
        marginLeft: 8,
        color: colors.invert400,
        fontFamily: 'semiBold',
    },
    errorMessage: {
        fontSize: 11,
        color: colors.redMain,
    },
    warningValue: {
        fontFamily: 'semiBold',
        color: colors.redMain,
    },
});

GaleryImageUploader.defaultProps = {
    disabled: false,
    showErrors: false,
    errorsCount: 0,
};

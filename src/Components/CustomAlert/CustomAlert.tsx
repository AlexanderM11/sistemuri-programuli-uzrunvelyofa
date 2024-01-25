import * as React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
    HeaderCloseIcon,
    DropdownCompleteIcon,
    Button,
} from '../../../src/Components';
import * as types from './types';
import { colors } from '../../../src/Theme';

export const CustomAlert = (props: types.CustomAlertProps) => {
    const {
        showModal,
        closeModal,
        confirmFunction,
        confirmButtonTitle,
        headerTitle,
        bodyText,
        alertIcon,
        cancellationButtonText,
    } = props;

    const renderAlertIcon = React.useCallback(() => {
        switch (alertIcon) {
            case 'completeIcon':
                return (
                    <DropdownCompleteIcon
                        width={75}
                        height={75}
                        color={colors.green200}
                    />
                );
        }
        return <View />;
    }, [alertIcon]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            style={{ zIndex: 1000 }}
        >
            <View style={styles.mainContainer}>
                <View style={styles.contentContainerStyle}>
                    <View style={styles.headerStyle}>
                        <TouchableOpacity
                            style={styles.headerRightIconContainer}
                            onPress={closeModal}
                        >
                            <HeaderCloseIcon />
                        </TouchableOpacity>
                    </View>
                    {alertIcon && (
                        <View style={styles.iconsContainer}>
                            {renderAlertIcon()}
                        </View>
                    )}
                    {headerTitle && (
                        <Text style={styles.headerText}>{headerTitle}</Text>
                    )}
                    <Text style={styles.bodyText}>{bodyText}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                        }}
                    >
                        <Button
                            onPress={confirmFunction ?? closeModal}
                            title={confirmButtonTitle}
                            style={{ ...styles.buttonStyle, marginRight: 16 }}
                            titleUppercase
                            fontFamily="semiBold"
                        />
                        {cancellationButtonText && (
                            <Button
                                onPress={closeModal}
                                title={cancellationButtonText}
                                style={styles.buttonStyle}
                                titleUppercase
                                type="secondary"
                            />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainerStyle: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 28,
        paddingVertical: 14,
    },
    headerStyle: {
        alignItems: 'flex-end',
    },
    headerRightIconContainer: {
        marginRight: 14,
    },
    headerText: {
        fontFamily: 'semiBold',
        textAlign: 'center',
        color: colors.invert400,
        fontSize: 18,
        marginTop: 12,
        paddingHorizontal: 10,
    },
    bodyText: {
        fontFamily: 'medium',
        textAlign: 'center',
        color: colors.invert400,
        fontSize: 12,
        marginTop: 12,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonStyle: {
        marginHorizontal: 10,
        flex: 1,
    },
    iconsContainer: {
        alignItems: 'center',
    },
});

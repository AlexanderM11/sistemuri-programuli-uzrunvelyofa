import React from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import * as types from './types';
const winHeight = Dimensions.get('window').height;

export const BottomModal = (props: types.BottomModalPropsType) => {
    const { visible, onRequestClose, children, height, isLoading, darkness } =
        props;

    return (
        <Modal
            style={styles.componentContainer}
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View
                style={[
                    styles.modalContainer,
                    darkness ? { backgroundColor: darkness } : undefined,
                ]}
            >
                <TouchableWithoutFeedback
                    disabled={isLoading}
                    onPress={onRequestClose}
                >
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View
                    style={[
                        styles.contentContainer,
                        {
                            minHeight: height ? height : winHeight * 0.2,
                            maxHeight: height ? height : winHeight * 0.9,
                        },
                    ]}
                >
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

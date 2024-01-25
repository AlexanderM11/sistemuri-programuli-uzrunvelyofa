import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ListRenderItem,
    Dimensions,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
} from 'react-native';
import {
    Header,
    BottomModal,
} from '../../../src/Components';
import * as types from './types';
import { colors } from '../../../src/Theme';

const height = Dimensions.get('window').height;


const SelectModal = (props: types.ModalPropsType) => {
    const {
        modalVisible,
        setModalVisible,
        setSelectedValue,
        route,
        modalTitle,
        renderItem,
        staticList,
        headerLeftIcon
    } = props;

    const [dataForSelect, setDataForSelect] = useState<
        types.SelectedValueType[] | types.SelectIdValueType[] | types.Rule[]
    >([]);

    const chooseIndex = (
        item: types.SelectedValueType | types.SelectIdValueType | types.Rule,
    ) => {
        if (setSelectedValue) {
            setSelectedValue(item);
        }
        closeModal();
    };

    const itemForSelect: ListRenderItem<
        types.SelectedValueType | types.SelectIdValueType | types.Rule
    > = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemForSelectStyle}
                onPress={() => chooseIndex(item)}
            >
                {renderItem(item, false, 14)}
            </TouchableOpacity>
        );
    };

    const closeModal = () => {
        setModalVisible(false);
        setDataForSelect([]);
    };

    return (
        <BottomModal
            visible={modalVisible}
            onRequestClose={closeModal}
            height={Platform.OS === 'ios' ? height * 0.95 : height * 0.6}
        >
            <Header
                headerLeft={headerLeftIcon}
                closeFunction={closeModal}
                title={modalTitle}
                isModal={true}
                headerRight="closeIcon"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={
                            route
                                ? dataForSelect
                                : staticList
                                    ? staticList
                                    : []
                        }
                        renderItem={itemForSelect}
                        keyExtractor={(item, index) =>
                            item.id + index.toString()
                        }
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            </TouchableWithoutFeedback>
        </BottomModal >
    );
};

const styles = StyleSheet.create({
    componentContainer: {
        flex: 1,
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemForSelectStyle: {
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderColor: colors.black25,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    input: {
        marginBottom: 10,
        marginTop: 15,
        marginHorizontal: 16,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        height: 30,
        borderRadius: 4,
        paddingVertical: 3,
        paddingLeft: 5,
        fontSize: 14,
        borderWidth: 0.4,
        borderColor: 'gray',
    },
    warningText: {
        color: colors.blackMain,
    },
    additionalButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: 14,
        paddingHorizontal: 25,
    },
    additionalButtonTitle: {
        fontSize: 14,
        fontFamily: 'medium',
        color: colors.invert400,
        marginLeft: 12,
    },
    iconWrapper: {
        backgroundColor: colors.primary25,
        padding: 12,
        borderRadius: 12,
    },
});

export default SelectModal;

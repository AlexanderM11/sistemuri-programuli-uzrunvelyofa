import React, { useCallback, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { SelectComponentIcon } from '../../../src/Components';
import * as types from './types';
import SelectModal from './SelectModal';
import { isEmpty } from 'lodash';
import { colors } from '../../../src/Theme';

export const SelectComponent = (props: types.SelectComponentProps) => {
    const {
        route,
        modalTitle,
        afterSelect,
        selectedItem,
        disabled = false,
        renderItem,
        headerLeftIcon,
        additionalQueryParams,
        staticList,
        additionalButtonTitle,
        additionalButtonFunction,
        required,
        beforeSelect,
    } = props;
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const openModal = useCallback(() => {
        if (beforeSelect) {
            beforeSelect();
        }
        setModalVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TouchableOpacity
                disabled={disabled}
                style={styles.buttonStyle}
                onPress={openModal}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: isEmpty(selectedItem) ? 'row' : 'column',
                    }}
                >
                    {renderItem(selectedItem, true, 12, disabled)}
                    {isEmpty(selectedItem) && (
                        <Text style={styles.requiredSign}>
                            {required ? ' *' : ''}
                        </Text>
                    )}
                </View>
                <SelectComponentIcon />
            </TouchableOpacity>
            <SelectModal
                headerLeftIcon={headerLeftIcon}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setSelectedValue={(selectedValue) => afterSelect(selectedValue)}
                route={route}
                modalTitle={modalTitle}
                renderItem={renderItem}
                additionalQueryParams={additionalQueryParams}
                staticList={staticList}
                additionalButtonTitle={additionalButtonTitle}
                additionalButtonFunction={additionalButtonFunction}
            />
        </>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: colors.invert25,
        borderWidth: 1,
        paddingVertical: 5,
        height: 56,
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    selectedTitle: {
        color: colors.invert150,
        fontSize: 11,
    },
    requiredSign: {
        color: colors.invert150,
    },
});

SelectComponent.defaultProps = {
    headerLeftIcon: '',
};

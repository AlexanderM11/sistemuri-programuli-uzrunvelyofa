import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { SearchIcon } from '../../../src/Components';
import { colors } from '../../../src/Theme';
import * as types from './types';

export const SearchInput = (props: types.SearchInputPropsType) => {
    const {
        placeholder,
        value,
        onChangeText,
        style,
        autoCorrect,
        inputStyle
    } = props;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.searchIconContainer}>
                <SearchIcon />
            </View>
            <TextInput
                value={value}
                placeholder={placeholder}
                style={[styles.inputContainer, inputStyle]}
                autoCorrect={autoCorrect}
                onChangeText={onChangeText}
                placeholderTextColor={colors.invert150}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: colors.invert25,
        borderWidth: 1,
        height: 44,
        borderRadius: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchIconContainer: {
        marginHorizontal: 16,
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        color: colors.invert400,
    },
});

import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { colors } from '../../Theme';
import * as types from './types';

const SearchTextWarning = require('../../Assets/Images/SearchTextWarning.png');

export const WarningContainer = (props: types.WarningContainerPropsType) => {
    const { warningText, width = 210, height = 150 } = props;

    return (
        <View style={styles.mainContainer}>
            <Image
                source={SearchTextWarning}
                resizeMode="contain"
                style={[styles.imageSize, { width, height }]}
            />
            <Text style={styles.textStyle}>{warningText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    textStyle: {
        color: colors.invert400,
        fontSize: 12,
        marginTop: 12,
        textAlign: 'center',
        fontFamily: 'medium',
    },
    imageSize: {
        height: 150,
        width: 210,
    },
});

WarningContainer.defaultProps = {
    type: 'normal',
};

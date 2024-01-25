import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, SelectComponent } from '../../../../../../src/Components';
import * as types from './types';
import { colors } from '../../../../../Theme';
import { StatusType, BugObject } from '../../../NewTicketsTab/Screens/NewBugScreen/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBugsListFetchingControl } from '../../../../../State/BugsListFetchingControl';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width - 32
const backgroundImage = require('../../../../../Assets/Images/CommonBackground.png')

const bugStatusList: types.BugListStatusObject[] = [
    { id: 0, value: 'BackLog' },
    { id: 1, value: 'InProgress' },
    { id: 2, value: 'InTesting' },
    { id: 3, value: 'Done' },
]

export const BugsDetailedScreen = (props: types.BugsDetailedScreenPropsType) => {
    const { route: { params: { bug, index } } } = props;
    const tempStatus = bugStatusList.find((status) => status.value === bug.status);
    const [selectedStatus, setSelectedStatus] = useState<types.BugListStatusObject>(tempStatus ?? { id: 0, value: 'BackLog' });
    const { setHaveToFetch } = useBugsListFetchingControl();
    const renderSeverityItem = useCallback((status: types.BugListStatusObject) => {
        return (
            <View style={styles.developerItemWrapper}>
                <Text style={{ color: colors.blackMain, fontSize: 20 }}>{status.value}</Text>
            </View>
        )
    }, [])

    const changeBugStatus = useCallback(async (status: types.BugListStatusObject) => {
        setSelectedStatus(status);
        await AsyncStorage.getItem('bugsList').then(async (data) => {
            if (data !== null) {
                let parsedData: BugObject[] = JSON.parse(data);
                parsedData[index].status = status.value;
                await AsyncStorage.setItem('bugsList', JSON.stringify(parsedData));
                setHaveToFetch(true);
            }
        })
    }, [setSelectedStatus])

    return (
        <View style={styles.screenContainer}>
            <ImageBackground
                style={styles.screenContainer}
                source={backgroundImage}
                imageStyle={{ resizeMode: 'stretch' }}
            >
                <Header
                    headerLeft='backButton'
                    titleUppercase
                    title='Bug`s Detailed Screen'
                    headerTitleSize={20}
                />
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={styles.scrollViewContainer}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                >
                    <Text style={styles.statusTitle}>Task Status</Text>
                    <View style={{ marginBottom: 20 }}>
                        <SelectComponent
                            staticList={bugStatusList}
                            selectedItem={selectedStatus}
                            renderItem={renderSeverityItem}
                            modalTitle={'Bug severity'}
                            selectedTitle={'Bug severity'}
                            afterSelect={changeBugStatus}
                        />
                    </View>
                    <View style={styles.sectionsWrapper}>
                        <Text style={styles.sectionTitle}>Title</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueStyle}>{bug.bugTitle}</Text>
                        </View>
                    </View>
                    <View style={styles.sectionsWrapper}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueStyle}>{bug.bugDescription}</Text>
                        </View>
                    </View>
                    <View style={styles.sectionsWrapper}>
                        <Text style={styles.sectionTitle}>Severity</Text>
                        <View style={styles.valueContainer}>
                            <Text style={{ ...styles.valueStyle, color: bug.bugSeverity.color }}>{bug.bugSeverity.name}</Text>
                        </View>
                    </View>
                    <View style={styles.sectionsWrapper}>
                        <Text style={styles.sectionTitle}>Attached Images</Text>
                        <View style={styles.imagesWrapper}>
                            {bug.bugImages.map((bugImage, index) => {
                                return (
                                    <View style={styles.imageWrapper} key={index.toString()}>
                                        <Image width={screenWidth} height={screenWidth} source={{ uri: `data:${bugImage.type};base64,${bugImage.base64}` }} />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.sectionsWrapper}>
                        <Text style={styles.sectionTitle}>Assigned Developer</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.developerItemWrapper}>
                                <View style={{ ...styles.initialsContainer, backgroundColor: bug.chosenDeveloper.AvatarBackgroundColor }}>
                                    <Text style={styles.initialsText}>{bug.chosenDeveloper.name[0]}{bug.chosenDeveloper.lastName[0]}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 18 }}>{bug.chosenDeveloper.name} {bug.chosenDeveloper.lastName}</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
        flex: 1,
    },
    sectionsWrapper: {
        marginBottom: 40,
    },
    valueContainer: {
        flex: 1,
    },
    developerItemWrapper: {
        alignItems: 'center',
        marginRight: 8
    },
    initialsContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
    },
    initialsText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.whiteMain,
    },
    developerName: {
        fontSize: 16,
        color: colors.blackMain,
        fontWeight: "300"
    },
    valueStyle: {
        fontSize: 18
    },
    imageWrapper: {
        width: screenWidth,
        height: screenWidth,
        marginRight: 10,
        marginBottom: 10
    },
    imagesWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: 16
    },
});

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '../../../../../../src/Components';
import * as types from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BugObject } from '../../../NewTicketsTab/Screens/NewBugScreen/types';
import { useBugsListFetchingControl } from '../../../../../State/BugsListFetchingControl';
import { debounce } from 'lodash';
import { SearchInput } from '../../../../../Components';
import { WarningContainer, PaperclipIcon } from '../../../../../Components';
import { colors } from '../../../../../Theme';
import { StatusType } from '../../../NewTicketsTab/Screens/NewBugScreen/types';

const backgroundImage = require('../../../../../Assets/Images/CommonBackground.png')

const bugStatusesList: { id: number, value: StatusType }[] = [
    { id: 0, value: 'BackLog' },
    { id: 1, value: 'InProgress' },
    { id: 2, value: 'InTesting' },
    { id: 3, value: 'Done' }
]

export const BugsListScreen = (props: types.SettingsScreenPropsType) => {
    const { navigation } = props;
    const [fetchedBugsList, setFetchedBugsList] = useState<BugObject[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredBugList, setFilteredBugList] = useState<BugObject[]>([]);
    const [bugStatuses, setBugStatuses] = useState<StatusType[]>([]);
    const { haveToFetch, setHaveToFetch } = useBugsListFetchingControl();

    const getExistedBugsList = useCallback(async () => {
        await AsyncStorage.getItem('bugsList').then(async (registeredBugs: string | null) => {
            if (registeredBugs !== null) {
                let parsedData = JSON.parse(registeredBugs);
                setFetchedBugsList(parsedData);
                setFilteredBugList(parsedData);
            }
        })
    }, [setFilteredBugList, setFetchedBugsList])

    useEffect(() => {
        if (haveToFetch) {
            getExistedBugsList();
            setHaveToFetch(false);
        }
    }, [haveToFetch])

    const filterList = useCallback((searchText?: string) => {
        let newFilteredList = fetchedBugsList.filter((bug) => {
            let filterBySearchText = searchText ? bug.bugTitle.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) : true;
            let filterByBugStatus = bugStatuses.length > 0 ? bugStatuses.find((status) => bug.status === status) : true;
            return filterBySearchText && filterByBugStatus;
        })
        setFilteredBugList(newFilteredList);
    }, [setFilteredBugList, bugStatuses, fetchedBugsList]);

    useEffect(() => {
        filterList(searchText);
    }, [bugStatuses])

    const handleChangeText = useCallback((text: string) => {
        filterList(text);
    }, [fetchedBugsList, setFilteredBugList, filterList]);

    const debouncedSearch = useMemo(
        () => debounce(handleChangeText, 200),
        [handleChangeText],
    );

    const checkStatusFilter = useCallback((status: StatusType) => {
        if (isStatusChecked(status)) {
            setBugStatuses(bugStatuses.filter((addedStatus) => addedStatus !== status));
        } else {
            setBugStatuses([...bugStatuses, status])
        }
    }, [setBugStatuses, bugStatuses])

    const isStatusChecked = useCallback((status: StatusType) => {
        return bugStatuses.find((addedStatus) => addedStatus === status)
    }, [bugStatuses])

    return (
        <View style={styles.screenContainer}>
            <ImageBackground
                style={styles.screenContainer}
                source={backgroundImage}
                imageStyle={{ resizeMode: 'stretch' }}
            >
                <Header
                    titleUppercase
                    title='Bugs List'
                    headerTitleSize={20}
                />
                <View style={styles.searchInputContainer}>
                    <SearchInput
                        value={searchText}
                        onChangeText={(text) => {
                            setSearchText(text);
                            debouncedSearch(text);
                        }}
                        placeholder={'Search by task name'}
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.statusesFilterContainer}
                        showsHorizontalScrollIndicator={false}
                    >
                        {bugStatusesList.map((item) => {
                            return (
                                <TouchableOpacity
                                    key={item.id.toString()}
                                    style={[styles.statusFilterButton, isStatusChecked(item.value) ? { backgroundColor: colors.green400 } : null]}
                                    onPress={() => checkStatusFilter(item.value)}
                                >
                                    <Text style={isStatusChecked(item.value) ? { color: colors.whiteMain } : { color: colors.blackMain }}>{item.value}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={styles.scrollViewContainer}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                >
                    {filteredBugList && filteredBugList.length > 0 ? filteredBugList.map((bug, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('BugsDetailedScreen', { bug, index })}
                                activeOpacity={.7}
                                style={{ ...styles.bugListItemContainer, borderLeftWidth: 5, borderLeftColor: bug.bugSeverity.color }}
                                key={index.toString()}
                            >
                                <Text numberOfLines={1} style={styles.bugTitleStyle}>{bug.bugTitle}</Text>
                                <View style={styles.attachedFilesQuantityWrapper}>
                                    <Text style={styles.attachedFilesQuantity}>
                                        {bug.bugImages.length}
                                    </Text>
                                    <PaperclipIcon />
                                </View>
                                <View style={styles.developerItemWrapper}>
                                    <View style={{ ...styles.initialsContainer, backgroundColor: bug.chosenDeveloper.AvatarBackgroundColor }}>
                                        <Text style={styles.initialsText}>{bug.chosenDeveloper.name[0]}{bug.chosenDeveloper.lastName[0]}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 100 }}>
                            <WarningContainer warningText='' />
                        </View>
                    }
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
    buttonPosition: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    searchInputContainer: {
        marginHorizontal: 16,
        marginTop: 20,
    },
    bugListItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginBottom: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderRadius: 2
    },
    bugTitleStyle: {
        fontSize: 16,
        fontWeight: "800",
        marginRight: 30,
        flex: 1,

    },
    developerItemWrapper: {
        alignItems: 'center'
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
    attachedFilesQuantityWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    attachedFilesQuantity: {
        color: colors.invert150,
        fontSize: 18,
        marginRight: 4,
    },
    statusesFilterContainer: {
        paddingHorizontal: 16,
        flexGrow: 1,
        paddingVertical: 10,
        height: 60,
        marginTop: 5
    },
    statusFilterButton: {
        height: 40,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        borderRadius: 2,
        marginRight: 8,
    },
});

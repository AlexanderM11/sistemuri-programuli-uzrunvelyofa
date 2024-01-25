import React, { useCallback, useState, useMemo } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TextInput,
    Text,
    Keyboard,
    Image
} from 'react-native';
import { Header, InputWrapper, SelectComponent, GaleryImageUploader, Button } from '../../../../../../src/Components';
import { colors } from '../../../../../../src/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'lodash';
import * as types from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBugsListFetchingControl } from '../../../../../State/BugsListFetchingControl';

const backgroundImage = require('../../../../../Assets/Images/CommonBackground.png')

const developersList = [
    {
        id: 0, name: 'Alexander',
        lastName: 'Mutafyan',
        AvatarBackgroundColor: colors.greenMain
    },
    {
        id: 1,
        name: 'Rati',
        lastName: 'Jebisashvili',
        AvatarBackgroundColor: colors.blueMain
    },
    {
        id: 3,
        name: 'Irakli',
        lastName: 'Jokhadze',
        AvatarBackgroundColor: colors.primaryMain
    },
]

const bugSeverityList = [
    { id: 0, name: 'Minor', color: colors.yellowMain },
    { id: 1, name: 'Major', color: colors.redMain },
    { id: 2, name: 'Critical', color: colors.blackMain },
]

export const NewBugScreen = (props: types.NewBugScreenPropsType) => {
    const { navigation } = props;
    const { setHaveToFetch } = useBugsListFetchingControl();
    const [bugTitle, setBugTitle] = useState<string>('');
    const [bugDescription, setBugDescription] = useState<string>('');
    const [chosenDeveloper, setChosenDeveloper] = useState<types.DeveloperObjectType>();
    const [bugSeverity, setBugSeverity] = useState<types.BugSeverityType>();
    const [bugImages, setBugImages] = useState<types.BugsImageObject[]>([]);

    const renderDeveloperItem = useCallback((developer: types.DeveloperObjectType) => {
        if (!isEmpty(developer)) {
            return (
                <View style={styles.developerItemWrapper}>
                    <View style={{ ...styles.initialsContainer, backgroundColor: developer.AvatarBackgroundColor }}>
                        <Text style={styles.initialsText}>{developer.name[0]}{developer.lastName[0]}</Text>
                    </View>
                    <Text style={styles.developerName}>{developer.name} {developer.lastName}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.developerItemWrapper}>
                    <Text style={{ color: colors.invert100 }}>Attach Bug To Developer</Text>
                </View>
            )
        }
    }, [])

    const renderSeverityItem = useCallback((severity: types.BugSeverityType) => {
        if (!isEmpty(severity)) {
            return (
                <View style={styles.developerItemWrapper}>
                    <Text style={{ ...styles.developerName, color: severity.color }}>{severity.name}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.developerItemWrapper}>
                    <Text style={{ color: colors.invert100 }}>Choose severity</Text>
                </View>
            )
        }
    }, [])

    const isSubmitButtonDisabled = useMemo(() => {
        if (bugTitle.length &&
            bugDescription.length &&
            !isEmpty(chosenDeveloper) &&
            !isEmpty(bugSeverity) &&
            bugImages.length
        ) {
            return false;
        }
        return true;
    }, [bugTitle, bugDescription, chosenDeveloper, bugSeverity, bugImages])

    const afterDeveloperPress = useCallback((value: types.DeveloperObjectType) => {
        setChosenDeveloper(value)
    }, [])

    const afterBugSeverityPress = useCallback((value: types.BugSeverityType) => {
        setBugSeverity(value)
    }, [])

    const submitFunction = useCallback(async () => {
        await AsyncStorage.getItem('bugsList').then(async (registeredBugs: string | null) => {
            let updatedBugsList: types.BugObject[] = [];
            if (
                chosenDeveloper &&
                bugSeverity &&
                bugTitle &&
                bugDescription &&
                bugImages
            ) {
                if (registeredBugs !== null) {
                    let parsedArray = JSON.parse(registeredBugs);
                    updatedBugsList = [...parsedArray, {
                        bugTitle,
                        bugDescription,
                        chosenDeveloper,
                        bugSeverity,
                        bugImages,
                        status: 'BackLog'
                    }]
                } else {
                    updatedBugsList = [{
                        bugTitle,
                        bugDescription,
                        chosenDeveloper,
                        bugSeverity,
                        bugImages,
                        status: 'BackLog'
                    }]
                }
                await AsyncStorage.setItem('bugsList', JSON.stringify(updatedBugsList)).then(() => {
                    setHaveToFetch(true);
                    navigation.navigate('MainTab', { screen: 'BugsListScreen' })
                    setBugTitle('');
                    setBugDescription('');
                    setChosenDeveloper(undefined);
                    setBugSeverity(undefined);
                    setBugImages([]);
                });
            }
        });
    }, [bugTitle,
        bugDescription,
        chosenDeveloper,
        bugSeverity,
        bugImages])

    return (
        <ImageBackground
            style={styles.screenContainer}
            source={backgroundImage}
            imageStyle={{ resizeMode: 'stretch' }}
        >
            <Header
                titleUppercase
                title='Register A Bug'
                headerTitleSize={20}
            />
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={false}
                scrollEnabled
                keyboardShouldPersistTaps="always"
            >
                <View style={{ flex: 1 }}>
                    <InputWrapper
                        value={bugTitle}
                        placeholder={'Title *'}
                        extendable={true}
                        required
                    >
                        <TextInput
                            onChangeText={setBugTitle}
                            value={bugTitle}
                            placeholder={'Title *'}
                            placeholderTextColor={colors.invert100}
                            style={styles.inputStyle}
                            autoCorrect={false}
                        />
                    </InputWrapper>
                    <View style={styles.fieldContainer}>
                        <InputWrapper
                            value={bugDescription}
                            placeholder={'Bug`s description *'}
                            extendable={true}
                            required
                        >
                            <TextInput
                                onChangeText={setBugDescription}
                                value={bugDescription}
                                placeholder={'Bug`s description *'}
                                placeholderTextColor={
                                    colors.invert100
                                }
                                multiline
                                style={styles.inputStyle}
                                autoCorrect={false}
                            />
                        </InputWrapper>
                    </View>

                    <View style={styles.fieldContainer}>
                        <GaleryImageUploader
                            uploaderTitle={'Attach screenshots'}
                            iconType="profileImage"
                            setFilesArray={setBugImages}
                            filesArray={bugImages}
                            required={true}
                            onComponentPress={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <SelectComponent
                            renderItem={renderSeverityItem}
                            afterSelect={afterBugSeverityPress}
                            beforeSelect={() => Keyboard.dismiss()}
                            modalTitle={'Bug severity'}
                            selectedItem={bugSeverity}
                            selectedTitle={'Bug severity'}
                            staticList={bugSeverityList}
                            required
                        />
                    </View>

                    <View style={styles.fieldContainer}>
                        <SelectComponent
                            renderItem={renderDeveloperItem}
                            afterSelect={afterDeveloperPress}
                            beforeSelect={() => Keyboard.dismiss()}
                            modalTitle={'Attach Bug To Developer'}
                            selectedItem={chosenDeveloper}
                            selectedTitle={'Attach Bug To Developer'}
                            staticList={developersList}
                            required
                        />
                    </View>


                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        cantPress={isSubmitButtonDisabled}
                        disabled={isSubmitButtonDisabled}
                        title='Register a bug'
                        titleUppercase
                        onPress={submitFunction}
                        style={styles.fieldContainer}
                    />
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 27,
    },
    buttonPosition: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 3,
        fontSize: 14,
        color: colors.invert400,
        fontFamily: 'GraphikGeorgian-Medium',
    },
    fieldContainer: {
        marginTop: 20,
    },
    developerItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    initialsContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        marginRight: 20,
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
    }
});

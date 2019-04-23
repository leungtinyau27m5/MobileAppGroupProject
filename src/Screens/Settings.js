import React, { Component } from 'react'
import {
    Button,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    AsyncStorage,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    BackHandler
} from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Sound from 'react-native-sound'
Sound.setCategory('Playback')

const music = {
    popSound: new Sound('pop.mp3', Sound.MAIN_BUNDLE) //import background music in bundle
}
//user preferences
export default class Settings extends Component {
    constructor(props) {
        super()
        this.state = {
            SoundVolume: null,
            EnableBackgroundMusic: null,
            PlayHomeAnima: null
        }
        this._initialize()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.props.screenProps.androidBackHandler('Home'))
    }
    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.props.screenProps.androidBackHandler('Home'))
    }
    _initialize = async() => { //getting user previous preferences
        let soundValue = await AsyncStorage.getItem('SoundVolume')  
        if (soundValue == null) { //null means users did not setup their preferences yet, then giving them default setting
            await AsyncStorage.setItem('SoundVolume', 0.8.toString())
            this.setState({
                SoundVolume: 0.8
            })
        } else {
            this.setState({
                SoundVolume: parseFloat(soundValue)
            })
        }

        let backgroundMusic = await AsyncStorage.getItem('EnableBackgroundMusic')
        if (backgroundMusic == null) {
            await AsyncStorage.setItem('EnableBackgroundMusic', '1')
            this.setState({
                EnableBackgroundMusic: '1'
            })
        } else {
            this.setState({
                EnableBackgroundMusic: backgroundMusic
            })
        }

        let homeAnima = await AsyncStorage.getItem('PlayHomeAnima')
        if (homeAnima == null) {
            await AsyncStorage.setItem('PlayHomeAnima', '1')
            this.setState({
                PlayHomeAnima: '1'
            })
        } else {
            this.setState({
                PlayHomeAnima: homeAnima
            })
        }
    }
    _changeAsyncStorage = async (target, action) => { //update user preferences in local storage
        action = action || null
        try {
            const value = await AsyncStorage.getItem(target)
            switch (target) {
                case 'SoundVolume':
                    if (this.state.EnableBackgroundMusic == '0') return
                    let volume = parseFloat(value)
                    if (action == 'down' && volume > 0) {
                        volume -= 0.2
                    } else if (action == 'up' && volume < 1) {
                        volume += 0.2
                    } else if ( volume >= 1) {
                        ToastAndroid.show('Max. Volume!', ToastAndroid.SHORT)
                        return
                    } else if (volume <= 0) {
                        ToastAndroid.show('Min. Volume!', ToastAndroid.SHORT)
                        return
                    }
                    music.popSound.setVolume(volume)
                    music.popSound.play()
                    await AsyncStorage.setItem(target, volume.toString())
                    this.setState({
                        SoundVolume: volume
                    })
                break;
                case 'PlayHomeAnima':
                    if (value == '1') {
                        await AsyncStorage.setItem(target, '0')
                        this.setState({
                            PlayHomeAnima: '0'
                        })
                    } else {
                        await AsyncStorage.setItem(target, '1')
                        this.setState({
                            PlayHomeAnima: '1'
                        })
                    }
                break;
                case 'EnableBackgroundMusic':
                    if (value == '1') {
                        await AsyncStorage.setItem('EnableBackgroundMusic', '0')
                        this.setState({
                            EnableBackgroundMusic: '0'
                        })
                    } else if(value == '0') {
                        await AsyncStorage.setItem('EnableBackgroundMusic', '1')
                        this.setState({
                            EnableBackgroundMusic: '1'
                        })
                    }
                break;
            }
        } catch(e) {

        }
    }
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text style={styles.title}>
                    Settings Page
                </Text>
                <ScrollView style={styles.scrollContainer}>
                    <Text style={[styles.itemTitle, {marginTop: 25}]}>
                        Background Music
                    </Text>
                    <View style={[styles.itemContainer]}>
                        <TouchableOpacity
                            onPress={() => this._changeAsyncStorage('EnableBackgroundMusic')}
                        >
                            <MaterialCommunityIcons
                                name={this.state.EnableBackgroundMusic == '1' ? 'music-note' : 'music-note-off'}
                                size={70}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.itemTitle, {marginTop: 25}]}>
                        Volume
                    </Text>
                    <View style={styles.itemContainer}>
                        <TouchableOpacity
                            onPress={() => this._changeAsyncStorage('SoundVolume', 'down')}
                            style={{marginRight: 25}}
                        >
                            <Ionicons
                                name={this.state.EnableBackgroundMusic == '1' ? "ios-volume-mute" : "ios-volume-off"}
                                size={95}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._changeAsyncStorage('SoundVolume', 'up')}
                            style={{marginLeft: 25}}
                        >
                            <Ionicons
                                name={this.state.EnableBackgroundMusic == '1' ? "ios-volume-high" : "ios-volume-off"}
                                size={95}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.itemTitle, {marginTop: 25}]}>
                        Animation Play
                    </Text>
                    <View style={[styles.itemContainer]}>
                        <TouchableOpacity
                            onPress={() => this._changeAsyncStorage('PlayHomeAnima')}
                        >
                            <Ionicons
                                name={this.state.PlayHomeAnima == '1' ? 'ios-play' : 'ios-pause'}
                                size={80}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}> BACK TO HOME PAGE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    itemTitle: {
        fontSize: 22,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    mainContainer: {
        backgroundColor: '#E4F7F6',
        paddingTop: 35,
        paddingLeft: 25,
        paddingRight: 25 
    },
    scrollContainer: {
       backgroundColor: '#FFFFFF',
       marginTop: 25,
       paddingBottom: 35,
       borderRadius: 35
    },  
    button: {
        backgroundColor: '#007ACC',
        marginTop: 25,
        width: 180,
        height: 55,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderRadius: 5,
        shadowColor: '#444444',
        shadowOffset: {
            width: 1,
            height: -1
        },
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonText: {
        fontSize: 15,
        color: '#FFFFFF'
    },
    enable: {
        backgroundColor: '#22FF22'
    },
    disable: {
        backgroundColor: '#FF2222'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingLeft: 35,
        paddingRight: 35,
        justifyContent: 'center'
    }
})
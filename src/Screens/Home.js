import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    SafeAreaView,
    BackHandler,
    Alert,
    ToastAndroid,
    PermissionsAndroid
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { 
    Transitioner 
} from 'react-navigation'
import * as Animatable from 'react-native-animatable'

import Ionicons from 'react-native-vector-icons/Ionicons'
import DeviceInfo from 'react-native-device-info'

import { serverConn } from '../server/config'

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            isChange: false,
            wantAnimation: true,
            backButtonCount: 0
        }
        this._getData()
        this._getRid()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.alertDialogBox)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.alertDialogBox)
    }
    alertDialogBox = () => {
        if (this.state.backButtonCount == 0) {
            ToastAndroid.show('Double press to exit', ToastAndroid.SHORT)
            BackHandler.addEventListener('hardwareBackPress', this.doubleBackButtonPress)
            const doubleBack = BackgroundTimer.setTimeout(() => {
                BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
            }, 2000)
        }
        return true
    }
    doubleBackButtonPress = () => {
        BackHandler.exitApp()
        return true
    }
    _getPhoneNumber = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
                {
                    title: 'Your Phone number is needed',
                    message: 
                        'We need your phone number to identify yourself',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK'
                }
            )
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permission is granted')
            } else {
                ToastAndroid.show('Permission is not granted', ToastAndroid.SHORT)
            }
        } catch (err) {
            ToastAndroid.show('Cant grant permission', ToastAndroid.SHORT)
        }
    }
    _getRid = async() => {
        //await AsyncStorage.removeItem('rid')
        let rid = await AsyncStorage.getItem('rid')
        let username = await AsyncStorage.getItem('username')
        if (rid !== null) return

        this._getPhoneNumber()
        const phoneNumber = DeviceInfo.getPhoneNumber()
        if (phoneNumber == null) 
            ToastAndroid.show('Phone number is not granted', ToastAndroid.SHORT)
        
        const data = {
            request: 'getMyToken',
            phone: phoneNumber
        }
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(responseData => {
            this._storeRid(responseData)
        })
        .catch((err) => {
            ToastAndroid.show('Request Failed', ToastAndroid.SHORT)
            console.log(err)
        })
        .done()
    }
    _storeRid = async (responseData) => {
        if (responseData !== false) {
            await AsyncStorage.setItem('rid', responseData.rid)
            await AsyncStorage.setItem('username', responseData.username)
        }
    }
    _getData = async () => {
        try {
            const value = await AsyncStorage.getItem('PlayHomeAnima')
            if (value == null || value == '1') {
                this.setState({
                    wantAnimation: true
                })
            } else {
                this.setState({
                    wantAnimation: false
                })
            }

        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <SafeAreaView>
                <ImageBackground
                    style={[styles.backgroundImage, {paddingTop: 0}]}
                >
                    <TouchableOpacity
                        style={[styles.touchableButton, styles.highScoreButton, {
                            padding: 0,
                            width: 130,
                            marginTop: 5,
                            marginLeft: 5
                        }]}
                        onPress={() => this.props.navigation.navigate('HighScore')}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons
                                name="ios-trophy"
                                size={25}
                                style={{color: '#FFF', marginRight: 10}}
                            />
                            <Text style={{fontSize: 16, color: '#FFF'}}>
                                High Score
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Animatable.View
                        style={[styles.topGameIcon, {flex: 1}]}
                        animation={this.state.wantAnimation ? animationType : ''}
                        delay={500}
                    >
                        <Text style={styles.gameTitle}>
                            Memory Game!
                        </Text>
                    </Animatable.View>
                    <View style={[styles.mainContainer, {flex: 2}]}>
                        <Animatable.View
                            style={{
                                position: 'absolute',
                                right: 14,
                                top: -210,
                            }}
                            animation={this.state.wantAnimation ? animationType : ''}
                            delay={1000}
                        >
                            <Image
                                style={{
                                    transform: [{rotate: '32deg'}]
                                }}
                                source={require('../assets/img/brain-pink.png')}
                            />
                        </Animatable.View>
                        <Animatable.View
                            style={{
                                postion: 'absolute',
                                left: 12,
                                top: 12
                            }}
                            animation={this.state.wantAnimation ? animationType : ''}
                            delay={1500}
                        >
                            <Image
                                style={{
                                    transform: [{rotate: '-32deg'}]
                                }}
                                source={require('../assets/img/brain-blue.png')}
                            />
                        </Animatable.View>
                        <Animatable.View
                            style={{
                                position: 'absolute',
                                right: 8,
                                bottom: 120,
                            }}
                            animation={this.state.wantAnimation ? animationType : ''}
                            delay={2000}
                        >
                            <Image
                            style={{
                                transform: [{rotate: '32deg'}]
                            }}
                                source={require('../assets/img/brain-orange.png')}
                            />
                        </Animatable.View>
                        <Animatable.View
                            style={{
                                position: 'absolute',
                                left: 21,
                                bottom: 25,
                            }}
                            animation={this.state.wantAnimation ? animationType : ''}
                            delay={2500}
                        >
                            <Image
                                source={require('../assets/img/brain-green.png')}
                            />
                        </Animatable.View>
                        <Animatable.View 
                            style={styles.buttonsContainer}
                            animation={this.state.wantAnimation ? animationType : ''}
                            delay={3000}
                        >
                            <TouchableOpacity
                                style={[styles.touchableButton, styles.startButton]}
                                onPress={ ()=>this.props.navigation.navigate('GameSwitch') }
                            >
                                <Text style={[styles.buttonText]}>
                                    Start !
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.touchableButton,styles.settingButton, {}]}
                                onPress={() => this.props.navigation.navigate('Settings')}
                            >
                                <Text style={[styles.buttonText]}>
                                    Settings
                                </Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const animationType= 'bounceIn'

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        backgroundColor: '#E4F7F6',
        height: '100%',
    },
    mainContainer: {
       
    },
    buttonsContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    touchableButton: {
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
        alignItems: 'center'
    },
    startButton: {
        backgroundColor: '#9BC746',
    },
    settingButton: {
        backgroundColor: '#F9A427',
    },
    highScoreButton: {
        backgroundColor: '#F8BF00'
    },
    buttonText: {
        fontSize: 27,
        color: '#FFFFFF',
        fontFamily: 'monospace'
    },
    topGameIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignSelf: 'center',
    },
    gameTitle: {
        fontSize: 38,
        marginTop: 0
    },  
    hideLayer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 25,
        position: 'absolute',
        bottom: 28,
    }
})
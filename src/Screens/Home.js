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
    ToastAndroid
} from 'react-native'
import BackgroundTimer from 'react-native-background-timer'
import { 
    Transitioner 
} from 'react-navigation'
import * as Animatable from 'react-native-animatable'

import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            isChange: false,
            wantAnimation: true,
            backButtonCount: 0
        }
        this._getData()
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
        //console.error(this.props.screenProps.androidBackHandler)
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
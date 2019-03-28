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
    BackHandler
} from 'react-native'

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
            wantAnimation: true
        }
        this._getData()
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
                    style={[styles.backgroundImage, {paddingTop: 35}]}
                >
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
                                style={[styles.touchableButton,styles.settingButton]}
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
        width: '100%',
        height: '100%',     
    },
    gameTitle: {
        fontSize: 38
    },  
    hideLayer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 25,
        position: 'absolute',
        bottom: 28,
    }
})
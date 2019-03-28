import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    AsyncStorage,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    AppState,
    BackHandler,
    ToastAndroid
} from 'react-native'


import Sound from 'react-native-sound'
Sound.setCategory('Playback')

const music = {
    bgMusic: new Sound('bg_music.mp3', Sound.MAIN_BUNDLE)
}
music.bgMusic.setNumberOfLoops(-1)
import GameSelection from '../Components/GameSelection'
export default class SelectGame extends Component {
    constructor(props) {
        super()
        this.state = {
            userPreferences: {
                SoundVolume: null,
                EnableBackgroundMusic: null,
                PlayHomeAnima: null,
                appState: AppState.currentState,
            }
        }
        this._loadUserPreferences = this._loadUserPreferences.bind()
        this._loadUserPreferences()
    }
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            music.bgMusic.play()
        } else {
            music.bgMusic.stop()
        }
      };
    _loadUserPreferences = async () => {
        let SoundVolume = await AsyncStorage.getItem('SoundVolume')
        let EnableBackgroundMusic = await AsyncStorage.getItem('EnableBackgroundMusic')
        let PlayHomeAnima = await AsyncStorage.getItem('PlayHomeAnima')
        if (SoundVolume == null) {
            SoundVolume = 0.8
        } else {
            SoundVolume = parseFloat(SoundVolume)
        }
        if (EnableBackgroundMusic == null) {
            EnableBackgroundMusic = '1'
        } 
        if (PlayHomeAnima == null) {
            PlayHomeAnima = '1'
        }
        this.setState({
            userPreferences: {
                SoundVolume: SoundVolume,
                EnableBackgroundMusic: EnableBackgroundMusic,
                PlayHomeAnima: PlayHomeAnima
            }
        }, () => {
            if (EnableBackgroundMusic == '0') return
            music.bgMusic.setVolume(parseFloat(SoundVolume))
            music.bgMusic.play()
        })
    }
    changeScene = () => {
        music.bgMusic.stop()
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <SafeAreaView style={styles.backgroundContainer}>
                <Text style={{
                    fontSize: 35,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    alignItems: 'center',
                    marginBottom: 75
                }}>
                    Select a Game :P
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <GameSelection
                        imageUrl={require('../assets/img/brain-blue.png')}
                        gameName='Memory'
                        navigation={this.props.navigation}
                        destination='MemoryGame'
                        handleAppStateChange={this.handleAppStateChange}
                    />
                    <GameSelection
                        imageUrl={require('../assets/img/brain-pink.png')}
                        gameName='Puzzle'
                        navigation={this.props.navigation}
                        destination='PuzzleGame'
                        handleAppStateChange={this.handleAppStateChange}
                    />
                </View>
                <View style={{flexDirection: 'row', marginTop: 25, alignItems: 'center'}}>
                    <GameSelection
                        imageUrl={require('../assets/img/brain-orange.png')}
                        gameName='Matching'
                        navigation={this.props.navigation}
                        destination='MatchingGame'
                        handleAppStateChange={this.handleAppStateChange}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.changeScene()}
                >
                    <Text style={styles.buttonText}> BACK TO HOME PAGE</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#AADAFF',
        paddingTop: 35,
        alignItems: 'center'
    },
    container: {
        width: 170,
        justifyContent: 'center',
        height: 165,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderRadius: 35,
        shadowColor: '#444444',
        shadowOffset: {
            width: 1,
            height: -1
        },
    },
    gameText: {
        fontSize: 25,
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
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
})
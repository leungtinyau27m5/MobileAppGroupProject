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
} from 'react-native'

import Sound from 'react-native-sound'
Sound.setCategory('Playback')

import GameSelection from '../Components/GameSelection'
export default class SelectGame extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        let bgMusic = new Sound('bg_music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error)
                return
            }
            bgMusic.setVolume(0.8)
            bgMusic.setNumberOfLoops(-1)
            bgMusic.play()
        }) 
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
                    />
                    <GameSelection
                        imageUrl={require('../assets/img/brain-pink.png')}
                        gameName='Puzzle'
                        navigation={this.props.navigation}
                        destination='PuzzleGame'
                    />
                </View>
                <View style={{flexDirection: 'row', marginTop: 25, alignItems: 'center'}}>
                    <GameSelection
                        imageUrl={require('../assets/img/brain-orange.png')}
                        gameName='Matching'
                        navigation={this.props.navigation}
                        destination='MatchingGame'
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#AADAFF',
        paddingTop: 35,
        paddingLeft: 25,
        paddingRight: 25
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
    }
})
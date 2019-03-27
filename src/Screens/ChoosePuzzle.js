import React, { Component } from 'react'
import {
    AppState,
    Image,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import PuzzleMode from '../Components/puzzles/puzzleMode'
import Modal from 'react-native-modal'
import LevelButton from '../Components/puzzles/LevelButtons'


export default class ChoosePuzzle extends Component {
    constructor(props) {
        super()
        this.state = {
            imageSelectModalVisible: false,
            numberLevelModalVisible: false,
            isImage: false
        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    componentWillUnmount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    toggleImageModal = () => {
        this.setState((prevState) => ({
            imageSelectModalVisible: !prevState.imageSelectModalVisible,
            isImage: !prevState.isImage
        }))
    }
    toggleNumberModal = () => {
        this.setState((prevState) => ({
            numberLevelModalVisible: !prevState.numberLevelModalVisible,
        }))
    }
    handleSelection = (type) => {
        this.toggleImageModal()
        this.startPuzzling(type)
    }
    handleNumLevelSelect = (selectedLevel) => {
        this.toggleNumberModal()
        this.startPuzzling(selectedLevel)
    }
    startPuzzling = (content) => {
        this.props.navigation.navigate('Puzzling', {level: content})
    }
    render() {
        return (
            <SafeAreaView>
                <View style={{
                    backgroundColor: '#09B2C7',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{flex: 1, paddingHorizontal: 5, paddingTop: 10, alignItems: 'center', textAlign: 'center', width: '100%'}}>
                        <Text style={{fontSize: 22, color: '#FFF', fontWeight: 'bold'}}>Select Puzzle Mode</Text>
                        <TouchableOpacity style={[styles.gameSelection, {}]} onPress={() => this.toggleImageModal()}>
                            <Image
                                source={require('../assets/img/OOO.gif')}
                            />
                            <View style={[styles.touchableButton, {borderColor: '#007ACC', borderWidth: 1}]}>
                                <Text style={styles.buttonText}>Image Mode</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.gameSelection, {}]} onPress={() => this.toggleNumberModal()}>
                            <Image
                                source={require('../assets/img/boom.gif')}
                                style={{width: 200, height: 185}}
                            />
                            <View style={[styles.touchableButton, {borderColor: '#007ACC', borderWidth: 1}]}>
                                <Text style={styles.buttonText}>Number Mode</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Modal 
                        style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '95%',
                            height: 280,
                            borderRadius: 25,
                        }}
                        animationIn='jello'
                        isVisible={this.state.imageSelectModalVisible}>
                        <View 
                            style={{ 
                                backgroundColor: '#4285F4', 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 280,
                                borderRadius: 25
                            }}>
                            <PuzzleMode type='image' name='Famous People' onClickFunction={this.handleSelection}/>
                            <PuzzleMode type='image' name='Test' onClickFunction={this.handleSelection}/>
                        </View>
                    </Modal>
                    <Modal 
                        style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: '95%',
                            height: 280,
                            borderRadius: 25
                        }}
                        animationIn='jello'
                        isVisible={this.state.numberLevelModalVisible}>
                        <View 
                            style={{ 
                                backgroundColor: '#E4F7F6', 
                                flexDirection: 'row', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                height: 280,
                                borderRadius: 25
                            }}>
                            <LevelButton onClickFunction={this.handleNumLevelSelect}/>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    gameSelection: {
        backgroundColor: '#FFF',
        borderRadius: 35,
        flex: 1,
        width: '85%',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 8,
        paddingVertical: 5,
        paddingHorizontal: 10
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
    buttonText: {
        fontSize: 24,
        fontFamily: 'monospace'
    },
})

import React, { Component } from 'react'
import {
    AppState,
    BackHandler,
    View,
    Text,
    Image,
    ImageBackground,
    ImageEditor,
    AsyncStorage,
    Button
} from 'react-native'

export default class PuzzlingImage extends Component {
    constructor(props) {
        super()
        this.state = {
            type: null,
            imageUri: null,
            currentAvailable: {
                row: null,
                col: null,
            },
            isWin: false,
            steps: 0
        }
    }
    componentWillMount() {
        this.cropImaged()
    }
    cropImaged = async() => {
        let cropData = {
            offset:{x:0,y:0}, 
            size:{width:20, height:20},
        }
        await ImageEditor.cropImage(
            '../assets/img/brain.png',
            cropData,
            (successURI) => { this.setState({imageUri: successURI}) },
            (error) => { console.log('cropImage', error)}
        )
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.addEventListener('hardwareBackPress', () => this.props.screenProps.handleBackButtonPress('ChoosePuzzle'))
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange)
        BackHandler.removeEventListener('hardwareBackPress', () => this.props.screenProps.handleBackButtonPress('ChoosePuzzle'))
    }
    render() {
        return (
            <View>
                <View style={{width: 267, height: 267}}>
                    <Image
                        source={{uri: this.state.imageUri}}
                    />
                    <Text>Coming Soon</Text>
                    <Button
                        title="Back To previous Page"
                        onPress={()=> this.props.navigation.navigate('SelectGame')}
                    />
                </View>
            </View>
        )
    }
}
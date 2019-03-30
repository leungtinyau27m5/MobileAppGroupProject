import React, { Component } from 'react'
import {
    AppState,
    BackHandler,
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native'

export default class PuzzlingImage extends Component {
    constructor(props) {
        super()
        this.state = {
            type: null,
            currentAvailable: {
                row: null,
                col: null,
            },
            isWin: false,
            steps: 0
        }
    }
    componentWillMount() {
       
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
                        source={require('../assets/img/brain.png')}
                    />
                </View>
            </View>
        )
    }
}
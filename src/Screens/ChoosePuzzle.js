import React, { Component } from 'react'
import {
    AppState,
    Image
} from 'react-native'

export default class ChoosePuzzle extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    componentWillUnmount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    render() {
        return (
            <Image
                source={require('../assets/img/giphy.gif')}
            />
        )
    }
}
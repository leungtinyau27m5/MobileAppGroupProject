import React, { Component } from 'react'
import {
    AppState
} from 'react-native'

export default class Puzzling extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    componentWillUnmount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    render() {

    }
}
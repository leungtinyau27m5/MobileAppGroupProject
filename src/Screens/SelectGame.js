import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    AsyncStorage
} from 'react-native'

export default class SelectGame extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <View>
                <Text>
                    Select Your Game
                </Text>
            </View>
        )
    }
}
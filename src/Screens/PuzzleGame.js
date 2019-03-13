import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

export default class PuzzleGame extends Component {
    render() {
        return (
            <View>
                <Text>
                    asdf
                </Text>
                <Button
                    title="Back to Home"
                    onPress={() => this.props.navigation.navigate('SelectGame')}
                ></Button>
            </View>
        )
    }
}
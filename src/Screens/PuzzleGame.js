import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import Puzzling from './Puzzling'
import ChoosePuzzle from './ChoosePuzzle'
import PuzzlingImage from './PuzzlingImage'

const SwtichScreens = createSwitchNavigator({
    ChoosePuzzle: {
        screen: ChoosePuzzle
    },
    Puzzling: {
        screen: Puzzling
    },
    PuzzlingImage: {
        screen: PuzzlingImage
    }
}, {
    initialRouteName: 'ChoosePuzzle'
})
export default class PuzzleGame extends Component {
    static router = SwtichScreens.router
    constructor(props) {
        super()
        this.state = {
            
        }
    }
    render() {
        const { navigation } = this.props
        const screenProps = {
            handleAppStateChange: navigation.state.params.handleAppStateChange,
            handleBackButtonPress: navigation.state.params.handleBackButtonPress
        }
        return (
            <SwtichScreens
                navigation={ navigation }
                screenProps={ screenProps }
            />
        )
    }
}
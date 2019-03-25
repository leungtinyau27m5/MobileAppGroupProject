import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import Puzzling from './Puzzling'
import ChoosePuzzle from './ChoosePuzzle'

const SwtichScreens = createSwitchNavigator({
    ChoosePuzzle: {
        screen: ChoosePuzzle
    },
    Puzzling: {
        screen: Puzzling
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
            handleAppStateChange: navigation.state.params.handleAppStateChange
        }
        return (
            <SwtichScreens
                navigation={ navigation }
                screenProps={ screenProps }
            />
        )
    }
}
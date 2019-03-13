import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    AsyncStorage,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
/*
import {
    fromLeft,
    fromTop,
    fromRight,
    fromBottom,
    fadeIn,
    zoomIn,
    zoomOutm
    flipY,
    flipX
} from 'react-navigation-transitions'
*/

import {
    createSwitchNavigator
} from 'react-navigation'

import SelectGame from '../Screens/SelectGame'
import MemoryGame from '../Screens/MemoryGame'

const Stacks = createSwitchNavigator({
    SelectGame: {
        screen: SelectGame,
        navigationOptions: ({ navigation }) => {
            return {
                header: null,
            }
        }
    },
    MemoryGame: {
        screen: MemoryGame,
        navigationOptions: ({ navigation }) => {
            return {
                header: null,
            }
        }
    }
}, {
    initialRouteName: 'SelectGame',
    defaultNavigationOptions: {
        header: null,
    },
})

export default class GameSwitchNavigator extends Component {
    static router = Stacks.router
    constructor(props) {
        super()
    }

    render() {
        const { navigation } = this.props
        return (
            <Stacks
                navigation={ navigation }
            />
        )
    }
}
import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    AsyncStorage
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'

import SelectGame from '../Screens/SelectGame'
import Home from '../Screens/Home'
import GameSwitchNavigator from './GameSwitchNavigator'
import Prepare from '../Screens/Prepare'

const Stacks = createSwitchNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                header: null,
            }
        }
    },
    GameSwitch: {
        screen: GameSwitchNavigator,
    }
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
       header: null,
    }
})

export default class MyStackNavigator extends Component {
    static router = Stacks.router
    constructor(props) {
        super()
    }
    
    render() {
        const { navigation } = this.props
        return (
            <Stacks navigation={ navigation } />
        )
    }
}
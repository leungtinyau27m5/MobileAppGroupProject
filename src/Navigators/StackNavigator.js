import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    AsyncStorage,
    ActivityIndicator
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
import Settings from '../Screens/Settings'

const Stacks = createSwitchNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                header: null,
            }
        }
    },
    Settings: {
        screen: Settings
    },
    GameSwitch: {
        screen: GameSwitchNavigator,
    }
}, {
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
        const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
        return (
            <Stacks 
                navigation={ navigation } 
                persistenceKey={navigationPersistenceKey}
                renderLoadingExperimental={() => <ActivityIndicator />}
            />
        )
    }
}
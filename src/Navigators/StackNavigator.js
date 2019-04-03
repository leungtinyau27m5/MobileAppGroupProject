import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    AsyncStorage,
    ActivityIndicator,
    BackHandler,
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
import HighScore from '../Screens/HighScore'

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
    },
    HighScore: {
        screen: HighScore
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
    componentDidMount() {
        //BackHandler.addEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid('Home'))
    }
    componentWillUnmount() {
        //BackHandler.addEventListener('hardwareBackPress', () => this.onBackButtonPressAndroid('Home'))
    }
    onBackButtonPressAndroid = (route) => {
        this.props.navigation.navigate(route)
        return true
    }
    render() {
        const { navigation } = this.props
        const screenProps = {
            androidBackHandler: this.onBackButtonPressAndroid
        }
        const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
        return (
            <Stacks 
                navigation={ navigation } 
                screenProps={ screenProps }
                persistenceKey={navigationPersistenceKey}
                renderLoadingExperimental={() => <ActivityIndicator />}
            />
        )
    }
}
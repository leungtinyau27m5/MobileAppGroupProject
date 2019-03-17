import React, { Component } from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  AppState
} from 'react-native';

import {
    createAppContainer
} from 'react-navigation'

import MyStackNavigator from './Navigators/StackNavigator'

const AppContainer = createAppContainer(MyStackNavigator);

export default class App extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <AppContainer />
    )
  }
}

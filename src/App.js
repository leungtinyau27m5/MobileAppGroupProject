import React, { Component } from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  AppState,
  AsyncStorage
} from 'react-native';

import {
    createAppContainer
} from 'react-navigation' //new routing container

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

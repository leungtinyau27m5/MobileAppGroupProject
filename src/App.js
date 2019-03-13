import React, { Component } from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';

import {
    createAppContainer
} from 'react-navigation'

import MyStackNavigator from './Navigators/StackNavigator'

const AppContainer = createAppContainer(MyStackNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

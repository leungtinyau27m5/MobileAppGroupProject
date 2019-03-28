import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    AppState,
    BackHandler
} from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'

import { ItemContainer } from '../Components/ItemContainer'
import { TimerCountDown } from '../Components/Timer'

export default class Prepare extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange);
        BackHandler.addEventListener('hardwareBackPress', () => this.backButtonPress('SelectGame'))
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this.props.screenProps.handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', () => this.backButtonPress('SelectGame'))
    }
    backButtonPress = (route) => {
        this.props.navigation.navigate(route)
        return true
    }
    navigateToSearchScene = () => {
        let targets = this.props.screenProps.target
        let settings = this.props.screenProps.levelSettings
        let rows = settings.Rows
        let cols = settings.Cols
        let allItems = []
        targets.forEach(function(element, index) {
            let detail = {
                id: `ans-${index}`,
                shape: element.shape,
                color: element.color,
                turning: element.turning,
                isReverse: element.isReverse,
                text: element.text,
                isCorrect: true
            }
            allItems.push(detail)
        });
        let wrongOptions = []
        let j = 0
        do {
            let temp = this.props.screenProps.generateItem(1, settings.color, settings.turning, settings.text)
            let isDuplicated = false
            for (let z = 0; z < targets.length; z++) {
                if (targets[z].shape == temp.shape && targets[z].color == temp.color) {
                    isDuplicated = true
                    return
                }
            }
            if (!isDuplicated) {
                wrongOptions.push(temp[0])
                j = j + 1
            }
        } while(j <= rows * cols - settings.number)
        wrongOptions.forEach(function(element, index) {
            let detail = {
                id: `oth-${index}`,
                shape: element.shape,
                color: element.color,
                turning: element.turning,
                isReverse: element.isReverse,
                text: element.text,
                isCorrect: false,
            }
            allItems.push(detail)
        })

        for (let i = 0; i < allItems.length; i++) {
            let pos = Math.floor(Math.random() * allItems.length)
            let temp = allItems[pos]
            allItems[pos] = allItems[i]
            allItems[i] = temp
        }
        
        this.props.navigation.navigate('Search', { 
            allItems: allItems
        })
    }
    generatedItemContainer = () => {
        let containers = []
        const formElement = this.props.screenProps.target
        for (let i = 0; i < formElement.length; i++) {
            
            containers.push(<ItemContainer 
                                key={ i }
                                target={ formElement[i] }
                                onClick={ this.props.screenProps.onClick }
                                levelSettings={ this.props.screenProps.levelSettings }
                            />
                            )
                            
        }
        return containers
    }
    render() {
        //console.error(this.props.screenProps.androidBackHandler)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E8E8F2' }}>
                <View style={ styles.topTextContainer }>
                    <Text style={ styles.textBig }>Level { this.props.screenProps.level }</Text>
                    <Text style={ styles.textMid }>Memoerize Time !</Text>
                </View>
                <View style={ styles.hintsContainer }>
                   { this.generatedItemContainer() }
                </View>
                <View style={ styles.counterContainer }>
                    <TimerCountDown 
                        switchToSearch={ this.navigateToSearchScene }
                        addTotalTimePlayed={ this.props.screenProps.addTotalTimePlayed }
                    />
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    topTextContainer:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
    },
    textBig: {
        fontSize: 28,
        fontFamily: 'Roboto'
    },
    textMid: {
        fontSize: 21,
    },
    itemContainer: {
        backgroundColor: "#FFFFFF",
    },
    hintsContainer: {
        flex: 9,
    },
    counterContainer: {
        flex: 1,
    }
})
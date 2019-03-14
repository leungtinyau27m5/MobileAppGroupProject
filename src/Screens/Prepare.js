import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
} from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'

import { ItemContainer } from '../Components/ItemContainer'
import { TimerCountDown } from '../Components/Timer'

export default class Prepare extends Component {
    constructor(props) {
        super()
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
        let wrongOptions = this.props.screenProps.generateItem(rows * cols - settings.number, settings.color, settings.turning, settings.text)
        wrongOptions.forEach(function(element, index) {
            let detail = {
                id: `oth-${index}`,
                shape: element.shape,
                color: element.color,
                turning: element.turning,
                isReverse: element.isReverse,
                text: element.text,
                isCorrect: false
            }
            allItems.push(detail)
        })

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
        //console.error(this.props.screenProps[0])
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E8E8F2' }}>
                <View style={ styles.topTextContainer }>
                    <Text style={ styles.textBig }>Level { this.props.screenProps.levelSettings.number }</Text>
                    <Text style={ styles.textMid }>Memoerize Time !</Text>
                </View>
                <View style={ styles.hintsContainer }>
                   { this.generatedItemContainer() }
                </View>
                <View style={ styles.counterContainer }>
                    <TimerCountDown 
                        switchToSearch={ this.navigateToSearchScene }
                    />
                </View>
            </SafeAreaView>
        )
    }
}
/*

                    <Items
                        name={ 2 } 
                        size={ 24 }
                        turning={ true }
                        isReverse={ false }
                        color={ 2 }
                    />

*/
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
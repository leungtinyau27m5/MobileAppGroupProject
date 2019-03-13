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
        this.props.navigation.navigate('Search', { 
            
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
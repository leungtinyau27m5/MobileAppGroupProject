import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native'

import { Items } from './Items'

export class ItemContainer extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    render() {
        const target = this.props.target
        const onClick = this.props.onClick
        const levelSettings = this.props.levelSettings
        //console.error(this.props.levelSettings)
        return (
            <View style={ styles.container }>
                <View style={[ styles.eachCols ]}>
                    <Text style={ styles.titleText }>
                        Shape
                    </Text>
                    <Items 
                        shape={ target.shape }
                        color={ onClick(10) }
                        //turning={ this.state.turning }
                        turning={ false }
                        isReverse={ target.isReverse }
                        isText={ target.text }
                    />
                </View>
                <View style={[ styles.eachCols, (levelSettings.color) ? '' : styles.hideCols ]}>
                    <Text style={ styles.titleText }>
                        Color
                    </Text>
                    <Items 
                        shape={ onClick(32) }
                        color={ target.color }
                        //turning={ this.state.turning }
                        turning={ false }
                        isReverse={ target.isReverse }
                        isText={ target.text }
                    />
                </View>
                <View style={[ styles.eachCols, (levelSettings.turning) ? '' : styles.hideCols ]}>
                    <Text style={ styles.titleText }>
                        Rotate
                    </Text>
                    <Items 
                        shape={ onClick(32) }
                        color={ onClick(10) }
                        turning={ target.turning }
                        isReverse={ target.isReverse }
                        isText={ target.text }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginTop: 15,
        paddingTop: 15, 
        paddingBottom: 15, 
        paddingRight: 20, 
        paddingLeft: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    },
    eachCols: {
        alignItems: 'center', 
        flex: 1
    },
    hideCols: {
        display: 'none'
    },  
    titleText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
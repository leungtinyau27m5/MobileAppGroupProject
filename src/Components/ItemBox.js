import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    Vibration
} from 'react-native'

import { Items } from './Items'

export class ItemBox extends Component {
    constructor(props) {
        super()
        this.state = {
            isAnswered: false,
            isRight: null   
        }
    }
    _checkIsRight = (itemID) => {
        if (this.state.isAnswered) return

        const right = 'ans'    
        if (itemID.substring(0, 3) == right) {
            this.setState({
                isAnswered: true,
                isRight: true
            })
        } else {
            const DURATION = 2200;
            const PATTERN = [0, 2000, 0]
            Vibration.vibrate(DURATION)
            this.setState({
                isAnswered: true,
                isRight: false
            })
        }
    }
    render() {
        const { item } = this.props
        return (
            <TouchableOpacity 
                style={[styles.container, this.state.isAnswered ? this.state.isRight ? styles.isRight : styles.isWrong : {}]}
                onPress={() => this._checkIsRight(item.id) }
            >
                <Items
                    key={item.id}
                    turning={item.turning}
                    isReverse={item.isReverse}
                    shape={item.shape}
                    color={item.color}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: 70,
        height: 70,
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 25
    },
    isRight: {
        backgroundColor: '#33DD33'
    },
    isWrong: {
        backgroundColor: '#DD3333'
    }
})
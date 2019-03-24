import React, { Component } from 'react'
import {
    Touchable,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

export default class GameSelection extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <TouchableOpacity 
                style={gameStyles.container}
                onPress={()=>this.props.navigation.navigate(this.props.destination, {handleAppStateChange: this.props.handleAppStateChange})}
            >
                <Image
                    source={this.props.imageUrl}
                />
                <Text style={gameStyles.gameText}>
                    { this.props.gameName }
                </Text>
            </TouchableOpacity>
        )
    }
}

const gameStyles = StyleSheet.create({
    container: {
        width: 170,
        justifyContent: 'center',
        height: 165,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        borderRadius: 35,
        shadowColor: '#444444',
        shadowOffset: {
            width: 1,
            height: -1
        },
    },
    gameText: {
        fontSize: 25,
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    }
})
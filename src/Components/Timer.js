import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import * as Animatable from 'react-native-animatable'

export class TimerCountDown extends Component {
    constructor(props) {
        super()
        this.state = {
            isStarted: false,
            counting: 30,
            deduct: 0
        }
    }
    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({
                counting: prevState.counting - 1,
                deduct: prevState.deduct + 1
            })
        ), 1000)
    }
    componentDidUpdate(){
        if (this.state.counting === 0) {
            clearInterval(this.interval)
            this.props.switchToSearch()
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={ styles.CircleShapeView }>
                        <Animatable.View
                            animation={(this.state.counting < 10 ) ? 'zoomIn' : ''}
                            iterationCount={9}
                        >
                            <Text style={[ styles.counterText, (this.state.counting < 10) ? styles.counterDanger : styles.counterText ]}>{ this.state.counting }</Text>
                        </Animatable.View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={[ (this.state.deduct > 5) ? styles.skipButton : styles.hideButton ]}
                        onPress={() => {
                            this.props.switchToSearch()
                        }}
                    >
                        <Text style={ styles.ButtonText }>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CircleShapeView: {
        justifyContent: 'center',
        width: 80,
        backgroundColor: '#FFFFFF',
        height: 80,
        borderRadius: 75,
        alignItems: 'center'
    },
    counterText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
    },
    counterDanger: {
        color: '#FF0000',
        fontWeight: 'bold',
        fontSize: 32
    },
    hideButton: {
        display: 'none',
    },
    skipButton: {
        display: 'flex',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#00FF00',
        borderWidth: 3,
        //backgroundColor: '#00FF00',
        padding: 10,
    },
    ButtonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20
    }
})
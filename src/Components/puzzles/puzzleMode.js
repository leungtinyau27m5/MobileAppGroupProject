import React, { Component } from 'react'
import {
    ImageBackground,
    TouchableOpacity,
    Text,
} from 'react-native'

export default class PuzzleMode extends Component {
    constructor(props) {
        super()
        this.state = {
            isImage: props.type == 'image' ? true : false
        }
    }
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 165,
                    height: 125,
                    backgroundColor: '#FFF',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 5,
                    marginRight: 5
                }}
                onPress={() => this.props.onClickFunction()}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: '#000',
                        textAlign: 'center',
                        position: 'absolute',
                        bottom: 5
                    }}
                >
                    {this.props.name}
                </Text>
            </TouchableOpacity>
        )
    }
}
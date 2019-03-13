import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'

import {
    Col,
} from 'react-native-easy-grid'

import { Items } from './Items'

export class ColContainer extends Component {
    render() {
        return (
            <Col>
                <Items
                    shape={ this.props.item.shape }
                    color={ this.props.item.color }
                    isReverser={ this.props.item.isReverser }
                    turning={ this.props.item.turning }
                />
            </Col>
        )
    }
}
import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native'

import {
    Col,
    Row,
    Grid
} from 'react-native-easy-grid'

import { RowContainer } from '../Components/RowContainer'
import { Items } from '../Components/Items'

export default class Search extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    _shuffleAllItems = () => {
        let correctItems = this.props.screenProps.target
        let settings = this.props.screenProps.levelSettings
        let allItems = new Array(settings.Rows).fill(new Array(settings.Cols).fill(null))
        let c = 0
        while (c < correctItems.length) {
            let row = this.props.screenProps.onClick(settings.Rows)
            let col = this.props.screenProps.onClick(settings.Cols)
            if (allItems[row][col] == undefined || allItems[row][col] == null) {
                allItems[row][col] = correctItems[c]
            }
            c++
        }
        for (let i = 0; i < settings.Rows; i++) {
            for (let j = 0; j < settings.Cols; j++) {
                if (allItems[i][j] == null) {
                    const ele = this.props.screenProps.generateItem(1, settings.color, settings.turning, settings.text)
                    allItems[i][j] = ele
                }
            }
        }
        return allItems
    }
    _renderRows = () => {
        const allItems = this._shuffleAllItems()
        let renderElem = allItems.forEach(element => {
            <View>
            {element.forEach(ele => {
                <Text>
                    asdf
                </Text>
            })}
            </View>
        });
        return renderElem
    }
    render() {
        const allItems = this._shuffleAllItems()
        //console.error(allItems)
        return(
            <Text>
                asdf
            </Text>
        )
    }
}
//{ this._generateRows() }</Grid>
const styles = StyleSheet.create({
    aGrid: {
        backgroundColor: '#FF00FF',
        borderWidth: 2,
        borderColor: '#000000'
    }
})
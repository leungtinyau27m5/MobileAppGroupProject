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
                c++
            }
        }
        for (let i = 0; i < settings.Rows; i++) {
            for (let j = 0; j < settings.Cols; j++) {
                if (allItems[i][j] == null) {
                    let ele
                    do {
                        ele = this.props.screenProps.generateItem(1, settings.color, settings.turning, settings.text)
                        if (!this.isRepeated(ele[0], allItems)) {
                            allItems[i][j] = ele[0]
                        }
                    } while (!this.isRepeated(ele[0], allItems))
                }
            }
        }
        return allItems
    }
    isRepeated = (item, allItems) => {
        for (let i = 0; i < allItems.length; i++) {
            for (let j = 0; j < allItems[i].length; j++) {
                if (allItems[i][j] !== null) {
                    let exist = allItems[i][j]
                    if (exist.shape == item.shape && exist.color == item.color && exist.isReverse == item.isReverse && exist.turing == item.turing) {
                        return true
                    }
                }
            }
        }
        return false
    }
    _renderRows = () => {
        const allItems = this._shuffleAllItems()
        let renderElem = allItems.map(function (element, i) {
            let ele = element.map(function (item, j) {
                return (
                    <Text>{`${item.shape}    `}</Text>
                )
            })
            return (
                <View 
                    key={`row-${i}`}
                    style={{flexDirection: 'row'}}
                >
                    {ele}
                </View>
            )
        })
        return renderElem
        
    }
    render() {
        return(
            <View>
                {this._renderRows()}
            </View>
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
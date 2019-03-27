import React, { Component } from 'react'
import {
    AppState,
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native'
import Modal from 'react-native-modal'

const {height, width} = Dimensions.get('window')
const config = {
    easy: {
        boardArray: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, '']
        ],
        width: '33.33%',
        height: width * 0.33,
        fontStyle: {
            size: 20
        }
    },
    normal: {
        boardArray: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, '']
        ],
        width: '25%',
        height: width * 0.25,
        fontStyle: {
            size: 18
        }
    },
    hard: {
        boardArray: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, '']
        ],
        width: '20%',
        height: width * 0.2,
        fontStyle: {
            size: 16
        }
    }
}
class Piece extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <TouchableOpacity 
                style={{
                    width: this.props.config.width,
                    height: this.props.config.height,
                    borderColor: '#007ACC',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
                onPress={() => this.props.handleClick(this.props.position)}
            >
            <Text style={{fontSize: this.props.config.fontStyle.size}}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}
export default class Puzzling extends Component {
    constructor(props) {
        super()
        const { navigation } = props
        const c = navigation.state.params.level == 'easy' ? config.easy : navigation.state.params.level == 'normal' ? config.normal : config.hard
        this.state = {
            config: c,
            currentAvailable: {
                row: c.boardArray.length - 1,
                col: c.boardArray[0].length - 1
            },
            isWin: false
        }
    }
    componentWillMount() {
        const rowLength = this.state.config.boardArray.length
        const colLength = this.state.config.boardArray[0].length
        const pos = null
        let board = this.state.config
        let currentAvailable = this.state.currentAvailable
        for (let i = 0; i < rowLength * 5; i++) {
            for (let j = 0;j < colLength * 2; j++) {
                let method
                let pass
                do {
                    pass = true
                    method = Math.floor((Math.random() * 4))
                    if (method == 0 && currentAvailable.row + 1 >= rowLength) pass=false
                    if (method == 1 && currentAvailable.row - 1 <= -1) pass=false
                    if (method == 2 && currentAvailable.col + 1 >= colLength) pass=false
                    if (method == 3 && currentAvailable.col -1 <= -1) pass=false
                } while (!pass)
                let target
                switch (method) {
                    case 0:
                        target = {
                            row: currentAvailable.row + 1,
                            col: currentAvailable.col
                        }
                    break;
                    case 1:
                        target = {
                            row: currentAvailable.row - 1,
                            col: currentAvailable.col
                        }
                    break;
                    case 2:
                        target = {
                            row: currentAvailable.row,
                            col: currentAvailable.col + 1
                        }
                    break;
                    case 3:
                        target = {
                            row: currentAvailable.row,
                            col: currentAvailable.col - 1
                        }
                    break;
                }
                board.boardArray[currentAvailable.row][currentAvailable.col] = board.boardArray[target.row][target.col]
                board.boardArray[target.row][target.col] = ''
                currentAvailable.row = target.row
                currentAvailable.col = target.col
            }
        }
        this.setState({
            config: board,
            currentAvailable: currentAvailable
        })
    }
    componentDidMount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    componentWillUnmount() {
        AppState.addEventListener('change', this.props.screenProps.handleAppStateChange)
    }
    checkWin = () => {
        let isWin = true
        let counting = 1
        const max = this.state.config.boardArray.length * this.state.config.boardArray[0].length -1
        this.state.config.boardArray.forEach((element, i) => {
            element.forEach((ele, j) => {
                if (counting > max) return
                if (ele !== counting) isWin = false
                ++counting
            })
        })
        if (!isWin) return
        this.setState({
            isWin: true
        })
    }
    changePiece = (pos) => {
        const currentAvailable = this.state.currentAvailable;
        let isAllowed = false
        if ((pos.row + 1) == currentAvailable.row && pos.col == currentAvailable.col) isAllowed = true
        if (pos.row == currentAvailable.row && (pos.col + 1) == currentAvailable.col) isAllowed = true
        if (pos.row == currentAvailable.row && (pos.col - 1) == currentAvailable.col) isAllowed = true
        if ((pos.row - 1) == currentAvailable.row && pos.col == currentAvailable.col) isAllowed = true
        if (!isAllowed) return

        let newBoard = this.state.config
        newBoard.boardArray[currentAvailable.row][currentAvailable.col] = newBoard.boardArray[pos.row][pos.col]
        newBoard.boardArray[pos.row][pos.col] = ''
        this.setState({
            config: newBoard,
            currentAvailable: {
                row: pos.row,
                col: pos.col
            }
        })
        this.checkWin()
    }
    _closeModal = () => {
        this.props.navigate('SelectGame')
    }
    renderBoardPiece = () => {
        let pieces = [];
        let items = this.state.config.boardArray.map((elem, i) => {
            elem.map((ele, j) => {
                const pos = {
                    row: i,
                    col: j
                }
                pieces.push(
                    <Piece key={`item-${ele}`} config={this.state.config} number={ele} handleClick={this.changePiece} position={pos}/>
                )
            })
        })
        return pieces
    }
    render() {
        //console.error(this.props.navigation.state.params.level)
        //console.error(this.state.config.boardArray[0][0])
        return (
        <SafeAreaView style={{justifyContent: 'center'}}>
            <View style={{width: '95%', padding: 5, borderColor: '#000', marginLeft: 'auto', marginRight: 'auto', height: '90%', justifyContent: 'center'}}>
                <View style={{borderColor: '#000', width: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
                {this.renderBoardPiece()}
                </View>
            </View>
            <Modal
                isVisible={this.state.isWin}
                animationIn='flash'
            >
                <View style={styles.modalContainer}>
                    <Text style={{color: '#FFFFFF', fontSize: 20}}>You Win the Game!</Text>
                    <Image
                        source={require('../assets/img/giphy.gif')}
                        resizeMode='cover'
                        style={{width: 180, height: 130}}
                    />
                    <TouchableHighlight
                        style={{
                            marginTop: 15
                        }}
                        onPress={()=>{
                            this._closeModal(!this.state.isWin)
                        }}
                    >
                        <Text style={{color: '#FFFFFF', fontSize: 22}}>Retry!</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        height: '45%',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#83BF45',
        borderRadius: 35
    }
})
import React, { Component } from 'react'
import {
    Text, View, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, Dimensions, Alert, Keyboard
} from 'react-native';
import Modal from 'react-native-simple-modal';

import colors from '../../assests/styles';
import Loader from '../general/Loader'
const fontFamily = colors.font;
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCard } from '../../actions/orders';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

class AddCard extends Component {
    constructor() {
        super();
        this.state = {
            cardNumber: '',
            cardNumberErr: false,
            cardName: '',
            cardNameErr: false,
            cvv: '',
            cvvErr: false,
            months: null,
            years: null,
            month: null,
            year: null,
            loader: false,
            cardType: 'visa'
        }
    }
    componentDidMount() {
        const currentYear = (new Date()).getFullYear();
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
        let years = range(currentYear, currentYear + 10, +1)
        let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.setState({ years, months })
    }
    maskCreditCard = (cardNumber) => {
        this.setState({ cardNumberErr: false })
        if (cardNumber.length == 4) {
            this.setState({ cardNumber: cardNumber + '-' })
            return true
        }
        if (cardNumber.length == 9) {
            this.setState({ cardNumber: cardNumber + '-' })
            return true
        }
        if (cardNumber.length == 14) {
            this.setState({ cardNumber: cardNumber + '-' })
            return true
        }
        else {
            this.setState({ cardNumber })
        }
    }
    submitBtn = () => {
        Keyboard.dismiss()
        const { cardNumber, cardName, cvv, month, year, cardType } = this.state;
        if (cardNumber.length !== 19) {
            this.setState({ cardNumberErr: true })
            this.cardNumber.focus()
        }
        else if (cardName.length < 5) {
            this.setState({ cardNameErr: true })
            this.cardName.focus()
        }
        else if (cvv.length !== 3) {
            this.setState({ cvvErr: true })
            this.cvv.focus()
        }
        else if (month == null) {
            this.setState({ monthErr: true })
        }
        else if (year == null) {
            this.setState({ yearErr: true })
        }
        else {
            const { user, addCard, navigation } = this.props
            this.setState({ loader: true })
            const data = new FormData()
            data.append('cardno', cardNumber)
            data.append('expiry', `${month}/${year}`)
            data.append('vcc', cvv)
            data.append('cardtype', cardType)
            data.append('phone_no', user.phone_no)
            data.append('session_key', user.session)
            new Promise((rsl, rej) => {
                addCard(data, rsl, rej)
            }).then(res => {
                this.setState({ loader: false })
                navigation.goBack();
            }).catch(err => {
                this.setState({ loader: false, cvv: '' })
                Alert.alert('Sorry!', err)
            })
        }
    }
    render() {
        const { cardType, cardNumberErr, cardNameErr, cvvErr } = this.state
        return (
            <>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='always'
                >
                    <View style={{ width: DEVICE_WIDTH > 700 ? '90%' : '100%' }} >
                        <Text style={[styles.text, {
                            color: cardNumberErr ? colors.red : colors.camera
                        }]} >Credit Card Number*</Text>
                        <TextInput
                            // autoFocus
                            placeholder='xxxx-xxxx-xxxx-xxxx'
                            value={this.state.cardNumber}
                            onChangeText={(cardNumber) => this.maskCreditCard(cardNumber)}
                            maxLength={19}
                            ref={(input) => { this.cardNumber = input; }}
                            onSubmitEditing={() => this.cardName.focus()}
                            blurOnSubmit={false}
                            keyboardType='numeric'
                            returnKeyLabel='Next'
                            style={styles.input}
                            placeholderTextColor='rgb(176, 176, 176)'
                        />
                        <Text style={[styles.text, {
                            color: cardNameErr ? colors.red : colors.camera
                        }]} >Name on Card*</Text>
                        <TextInput
                            placeholder='Name on Card'
                            value={this.state.cardName}
                            onChangeText={(cardName) => {
                                this.setState({ cardName, cardNameErr: false })
                            }}
                            ref={(input) => { this.cardName = input; }}
                            onSubmitEditing={() => this.cvv.focus()}
                            blurOnSubmit={false}
                            returnKeyLabel='Next'
                            style={styles.input}
                            placeholderTextColor='rgb(176, 176, 176)'
                        />
                        <View style={styles.infoContainer} >
                            <View style={{ width: '35%', }} >
                                <Text style={[styles.text, { color: this.state.monthErr ? colors.red : 'black' }]} >Expiration Date*</Text>
                                <TouchableOpacity
                                    style={styles.picker}
                                    onPress={() => this.setState({ showMonths: true })}
                                >
                                    {this.state.month ? <Text style={StyleSheet.motnhText} >{this.state.month}</Text>
                                        : <Text style={StyleSheet.motnhText} >Month</Text>}
                                    <Icon name='angle-down' size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '30%', }} >
                                {this.state.yearErr && <Text style={[styles.text, { color: colors.red }]} >Year*</Text>}
                                <TouchableOpacity
                                    style={[styles.picker, { paddingLeft: '30%' }]}
                                    onPress={() => this.setState({ showYears: true })}
                                >
                                    {this.state.year ? <Text style={styles.yearText} >{this.state.year}</Text>
                                        : <Text style={styles.yearText} >Year</Text>}
                                    <Icon name='angle-down' size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '30%', }} >
                                <Text style={[styles.text, {
                                    color: cvvErr ? colors.red : colors.camera
                                }]} >CVV*</Text>
                                <TextInput
                                    placeholder='CVV'
                                    value={this.state.cvv}
                                    onChangeText={(cvv) => {
                                        this.setState({ cvv, cvvErr: false })
                                    }}
                                    ref={(input) => { this.cvv = input; }}
                                    style={[styles.input, {
                                        height: 42,
                                        marginTop: 10,
                                        paddingVertical: 0,
                                        textAlign: 'center',
                                    }]}
                                    keyboardType='numeric'
                                    maxLength={3}
                                    placeholderTextColor='rgb(176, 176, 176)'
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.text, { marginBottom: 20 }]} >Card Type*</Text>
                            <TouchableOpacity
                                onPress={() => this.setState({ cardType: 'visa' })}
                                style={styles.cardType} >
                                <View style={[styles.radio, {
                                    borderWidth: cardType == 'visa' ? 1.5 : 1,
                                    backgroundColor: cardType == 'visa' ? colors.schedule : 'transparent'

                                }]} />
                                <Text style={{ fontFamily }} >Visa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ cardType: 'mastercard' })}
                                style={styles.cardType} >
                                <View style={[styles.radio, {
                                    borderWidth: cardType == 'mastercard' ? 1.5 : 1,
                                    backgroundColor: cardType == 'mastercard' ? colors.schedule : 'transparent'

                                }]} />
                                <Text style={{ fontFamily }} >Master Card</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.container, {
                    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 10,
                }]} >
                    <TouchableOpacity style={styles.primaryBtn}
                        mode='contained'
                        onPress={() => this.submitBtn()}
                    >
                        <Text style={styles.primaryText} >Add Card</Text>
                    </TouchableOpacity>
                </View>
                {this.state.loader && <Loader />}
                {this.state.showMonths &&
                    <Modal
                        open={this.state.showMonths}
                        modalDidClose={() => this.setState({ showMonths: false })}

                    >
                        <ScrollView
                            style={{ height: '50%', }}
                        >
                            {this.state.months.map((item, i) => {
                                return (
                                    <TouchableOpacity key={i}
                                        style={{ padding: 10 }}
                                        onPress={() => this.setState({ month: item, showMonths: false, monthErr: false })}
                                    >
                                        <Text style={{ fontFamily, fontSize: 16 }} >{item}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </Modal>}
                {this.state.showYears &&
                    <Modal
                        open={this.state.showYears}
                        modalDidClose={() => this.setState({ showYears: false })}
                    >
                        <ScrollView
                            style={{ height: '50%', }}
                        >
                            {this.state.years.map((item, i) => {
                                return (
                                    <TouchableOpacity key={i}
                                        style={{ padding: 10 }}
                                        onPress={() => this.setState({ year: item, showYears: false, yearErr: false })}
                                    >
                                        <Text style={{ fontFamily, fontSize: 16 }} >{item}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </Modal>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        cartData: state.ordersReducer.cartData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addCard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
        marginBottom: 5,
        marginTop: 15,
        fontFamily,
        left: 10
    },
    input: {
        fontFamily,
        backgroundColor: colors.secondary,
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
        color: colors.camera,
    },
    infoContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 30
    },
    picker: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    motnhText: {
        fontFamily,
        fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
        paddingLeft: 10
    },
    yearText: {
        fontFamily,
        fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
        textAlign: 'center'
    },
    cardType: {
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 10,
        marginBottom: 20
    },
    radio: {
        width: 20, height: 20,
        borderRadius: 50, marginRight: 5,
    },
    primaryBtn: {
        width: '100%',
        backgroundColor: colors.primary,
        marginTop: 10,
        borderRadius: 10,
        height: DEVICE_HEIGHT > 600 ? 55 : 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: DEVICE_WIDTH > 700 ? '90%' : '100%'
    },
    primaryText: {
        color: colors.white,
        fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
        fontFamily
    },
})

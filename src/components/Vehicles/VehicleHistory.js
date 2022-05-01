import React, { Component } from 'react'
import {
    Text, View, StyleSheet, ScrollView, Dimensions, Alert,
    TouchableOpacity,
} from 'react-native';

import colors from '../../assests/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVehicleHistory } from '../../actions/vechicles';

const fontFamily = colors.font;
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window')

import Loader from '../general/Loader'

const MONTHS = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

class VehicleHistory extends Component {
    state = {
        loader: true,
        history: null
    }
    componentDidMount() {
        const { navigation, getVehicleHistory, user } = this.props
        let vehicle_id = navigation.getParam('vehicle_id')
        new Promise((rsl, rej) => {
            getVehicleHistory(user.phone_no, user.session, vehicle_id, rsl, rej)
        })
            .then(res => {
                this.setState({ loader: false, history: res })

            }).catch(err => {
                navigation.goBack()
                Alert.alert('Sorry', err)
            })
    }
    render() {
        const { history, loader } = this.state
        if (loader) {
            return <Loader />
        }
        return (
            <>
                <ScrollView
                    contentContainerStyle={styles.container}
                >
                    <Text style={{ color: colors.red, fontSize: DEVICE_HEIGHT > 600 ? 25 : 18, fontFamily }} >{history.since_used}</Text>
                    <Text style={{ fontFamily, fontSize: DEVICE_HEIGHT > 600 ? 16 : 12, marginBottom: 30 }}  >passed since last oil change</Text>
                    <>
                        {history.data.map((item, i) => {
                            let date = item.order_execution_date.split('-')
                            return (
                                <View style={styles.cardContainer} key={i} >
                                    <View>
                                        <Text style={{ fontFamily, fontSize: DEVICE_HEIGHT > 600 ? 16 : 14, }} >{date[2]} {MONTHS[date[1] - 1]} {date[0]} </Text>
                                        <Text style={{ fontFamily, fontSize: DEVICE_HEIGHT > 600 ? 12 : 10 }} >Odometer: {item.odometer_reading} km</Text>
                                    </View>
                                    <Text style={{ fontFamily, fontSize: DEVICE_HEIGHT > 600 ? 10 : 10 }} >Oil Type Used (ODI): {item.oil_type} kms</Text>
                                </View>
                            )
                        })
                        }
                    </>
                </ScrollView>
                <View style={[styles.container, { marginBottom: 30 }]} >
                    <TouchableOpacity style={styles.primaryBtn}
                        onPress={() => this.props.navigation.replce('Home')}
                    >
                        <Text style={styles.primaryText} >New Order</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getVehicleHistory
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleHistory);


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    primaryBtn: {
        width: '90%',
        backgroundColor: colors.primary,
        marginTop: 10,
        borderRadius: 10,
        height: DEVICE_HEIGHT > 600 ? 55 : 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryText: {
        color: colors.white,
        fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
        fontFamily
    },
})

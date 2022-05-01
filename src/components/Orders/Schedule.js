import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import colors from '../../assests/styles';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import MyCalendar from './calender';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTimeSlots, cart} from '../../actions/orders';

class Schedule extends Component {
  constructor() {
    super();
    const date = new Date();
    this.state = {
      currentDate: date.getDate() + 1,
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear(),
      slots: null,
      selectedSlot: null,
      edit: false,
      order_execution_date: null,
      edit: false,
    };
  }
  componentDidMount = () => {
    const {navigation, edit_order, user} = this.props;

    const edit = navigation.getParam('edit');
    if (edit) {
      let {
        order_execution_date,
        price,
        timeslot_naration,
        to_time,
        date,
        id,
      } = edit_order;
      let order_date = order_execution_date;
      order_execution_date = order_execution_date.split('-');
      this.setState({
        edit: true,
        slot: id,
        selectedSlot: {
          price,
          id,
          from_time: timeslot_naration,
          to_time,
          date,
        },
      });
      const current = parseInt(order_execution_date[2]) - 1;
      let parseMonth = order_execution_date[1];
      parseMonth = parseInt(parseMonth) - 1;
      const newDate = this.dateFun(
        current,
        parseMonth,
        order_execution_date[0],
      );
      this.getTimeSlotsFun(order_date);
    } else {
      let dateObject = new Date();
      let currentDate = dateObject.getDate();
      let currentMonth = dateObject.getMonth();
      let currentYear = dateObject.getFullYear();
      const newDate = this.dateFun(currentDate, currentMonth, currentYear);
      this.getTimeSlotsFun(newDate);
    }
  };
  dateFun = (currentDate, currentMonth, currentYear) => {
    let month = currentMonth;
    currentMonth += 1;
    switch (currentMonth) {
      case 2:
        if (currentDate == 29) {
          currentDate = 1;
          if (currentMonth == 12) {
            currentMonth = 1;
            currentYear += 1;
          } else {
            currentMonth += 1;
            month += 1;
          }
        } else if (currentDate == 28) {
          currentDate = 1;
          if (currentMonth == 12) {
            currentMonth = 1;
            currentYear += 1;
          } else {
            currentMonth += 1;
            month += 1;
          }
        } else {
          currentDate += 1;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        if (currentDate == 30) {
          currentDate = 1;
          if (currentMonth == 12) {
            currentMonth = 1;
            currentYear += 1;
          } else {
            currentMonth += 1;
            month += 1;
          }
        } else {
          currentDate += 1;
        }
        break;
      default:
        if (currentDate == 31) {
          currentDate = 1;
          if (currentMonth == 12) {
            currentMonth = 1;
            month = 0;
            currentYear += 1;
          } else {
            currentMonth += 1;
            month += 1;
          }
        } else {
          currentDate += 1;
        }
        break;
    }
    this.setState({
      order_execution_date: currentDate,
      order_executation_month: month,
      currentDate,
      currentMonth: month,
      currentYear,
      order_execution_year: currentYear,
    });
    return `${currentYear}-${currentMonth}-${currentDate}`;
  };
  getTimeSlotsFun = order_date => {
    const {getTimeSlots, user} = this.props;
    new Promise((rsl, rej) => {
      getTimeSlots(user.phone_no, user.session, order_date, rsl, rej);
      this.setState({slotsLoader: true});
    })
      .then(slots => {
        this.setState({slotsLoader: false});
        this.setState({slots});
      })
      .catch(err => {
        this.setState({slotsLoader: false});
        Alert.alert('Sorry!', err);
      });
  };
  setCurrentDate = currentDate => {
    const {getTimeSlots, user} = this.props;
    let {currentMonth, currentYear} = this.state;
    this.setState({currentDate, order_execution_date: currentDate});
    let month = currentMonth + 1;
    if (month == 13) {
      month = '01';
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (currentDate < 10) {
      currentDate = `0${currentDate}`;
    }
    let date = `${currentYear}-${month}-${currentDate}`;
    new Promise((rsl, rej) => {
      getTimeSlots(user.phone_no, user.session, date, rsl, rej);
      this.setState({slotsLoader: true, selectedSlot: null, slot: null});
    })
      .then(slots => {
        this.setState({slotsLoader: false});
        this.setState({slots});
      })
      .catch(err => {
        this.setState({slotsLoader: false, slots: null});
        Alert.alert('Sorry!', err);
      });
  };
  setCurrentMonth = currentMonth => {
    let dateObject = new Date();
    let currentYear = dateObject.getFullYear();
    let currentDate = 0;
    if (this.state.edit) {
      let month = currentMonth + 1;
      let order_date = this.props.edit_order.order_execution_date.split('-');
      const current = parseInt(order_date[2]) - 1;
      if (month == parseInt(order_date[1])) {
        currentDate = current;
      }
    } else if (currentMonth == dateObject.getMonth()) {
      currentDate = dateObject.getDate();
    }
    if (currentMonth == 11) {
      this.setState({currentYear: this.state.currentYear + 1});
      currentYear += 1;
      currentMonth = 0;
    }
    this.setState({currentMonth});
    const newDate = this.dateFun(currentDate, currentMonth, currentYear);
    this.getTimeSlotsFun(newDate);
  };
  handler = () => {
    const {
      selectedSlot,
      currentDate,
      currentMonth,
      currentYear,
      order_execution_date,
      edit,
    } = this.state;
    const {cartData, navigation, cart, user} = this.props;
    const data = {
      ...cartData,
      selectedSlot,
      currentDate,
      currentMonth,
      currentYear,
    };

    cart(data);
    edit
      ? navigation.navigate('OilSelection', {edit: true})
      : navigation.navigate('OilSelection');
  };
  render() {
    const {
      slotsLoader,
      slot,
      order_execution_date,
      order_executation_month,
      order_execution_year,
    } = this.state;
    return (
      <>
        <ScrollView contentContainerStyle={styles.container}>
          <MyCalendar
            setCurrentDate={this.setCurrentDate}
            setCurrentMonth={this.setCurrentMonth}
            order_execution_date={order_execution_date}
            order_executation_month={order_executation_month}
            order_execution_year={order_execution_year}
            edit={this.state.edit}
          />
          {this.state.slots && (
            <View style={styles.timeSlot}>
              <Text style={styles.header}>Time Slot</Text>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={styles.header}>Service Charges</Text>
                <Text style={styles.vat}>Incl 5% VAT</Text>
              </View>
            </View>
          )}
          {!slotsLoader ? (
            <>
              {this.state.slots &&
                this.state.slots.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.timeSlot,
                        {
                          backgroundColor:
                            item.status == 'InActive'
                              ? colors.secondary
                              : slot == item.id
                              ? colors.schedule
                              : 'transparent',
                        },
                      ]}
                      onPress={() => {
                        if (item.status !== 'InActive') {
                          this.setState({slot: item.id, selectedSlot: item});
                        } else {
                          Alert.alert(null, 'Not Available');
                        }
                      }}>
                      <Text
                        style={[
                          styles.header,
                          {
                            color:
                              item.status !== 'InActive'
                                ? colors.camera
                                : colors.schedule,
                          },
                        ]}>
                        {item.from_time}
                      </Text>
                      <Text
                        style={[
                          styles.header,
                          {
                            color:
                              item.status !== 'InActive'
                                ? colors.camera
                                : colors.schedule,
                          },
                        ]}>
                        {item.price} AED
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={30} color={colors.schedule} />
            </View>
          )}
        </ScrollView>
        {slot && (
          <View
            style={[
              styles.container,
              {marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20},
            ]}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    cartData: state.ordersReducer.cartData,
    edit_order: state.ordersReducer.edit_order,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTimeSlots,
      cart,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);
const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    // marginTop: 20,
  },
  calender: {
    width: '75%',
    marginTop: 20,
    marginBottom: 20,
  },
  timeSlot: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  header: {
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 14,
    fontFamily,
  },
  vat: {
    fontSize: 11,
    color: colors.camera,
    textAlign: 'right',
    fontFamily,
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:DEVICE_HEIGHT > 600 ? 20 : 0
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import colors from '../../assests/styles';

import editIcon from '../../assests/editColor.png';
import trash from '../../assests/trash2.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getCompletedOrders,
  deleteOrder,
  editOrder,
  removeEditOrder,
} from '../../actions/orders';

import Loader from '../general/Loader';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
class CompletedOrders extends Component {
  constructor() {
    super();
    this.state = {
      tab: 0,
    };
  }
  componentDidMount = () => {
    this.getOrdersFun();
    console.log(this.props);
  };
  getOrdersFun = () => {
    this.props.loaderFun();
    const {user, getCompletedOrders} = this.props;
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    new Promise((rsl, rej) => {
      getCompletedOrders(data, rsl, rej);
    })
      .then(() => {
        this.props.loaderFun();
      })
      .catch(err => {
        this.props.loaderFun();
        Alert.alert('Sorry', err);
      });
  };
  render() {
    const {orders} = this.props;
    return (
      <View style={styles.container}>
        {orders !== undefined ? (
          <View style={{flex: 3, width: '100%'}}>
            {orders.map((item, i) => {
              let date = item.order_execution_date.split('-');
              return (
                <View style={styles.orderContainer} key={i}>
                  <View style={styles.orderListContainer}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item);
                          if (item?.driver_rating == null) {
                            this.props.navigation.navigate('Rating', {
                              job: item,
                            });
                          } else {
                            alert('already rated');
                          }
                        }}>
                        <Text style={styles.text}>
                          {/* Order id {item.order_no} */}
                          Order id {item.order_id}
                        </Text>
                        <Text style={styles.text}>{item.from_time}</Text>
                        <Text numberOfLines={1} style={styles.text}>
                          {item?.order_execution_date?.split(' ')[0]}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.noOrderContainer}>
            <Text style={styles.noOrdeText}>
              You don't have any completed order yet
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    orders: state.ordersReducer.completedOrders,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getCompletedOrders,
      deleteOrder,
      editOrder,
      removeEditOrder,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompletedOrders);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  scheduleContainer: {
    // width: '48%',
    // width: DEVICE_WIDTH > 700 ? 200 : DEVICE_WIDTH * 0.5,
    borderBottomWidth: 2,
    paddingBottom: 5,
    marginBottom: 20,
  },
  schedule: {
    // color: colors.camera,
    fontSize: DEVICE_HEIGHT > 600 ? 20 : 16,
    fontFamily,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgb(211,211,211)',
    paddingBottom: 5,
  },
  orderListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // width: "80%",
    overflow: 'hidden',
    // marginRight: "2%"
  },
  text: {
    width: '100%',
    fontFamily,
    lineHeight: 20,
    color: 'black',
    fontSize: DEVICE_HEIGHT > 600 ? 16 : 12,
  },
  orderIconsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  orderIcon: {
    // marginRight: 10,
    width: DEVICE_HEIGHT > 600 ? 30 : 20,
    height: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  primaryBtn: {
    width: '90%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 30 : 20,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
  noOrderContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  noOrdeText: {
    fontSize: 20,
    color: colors.number,
    textAlign: 'center',
    fontFamily,
  },
});

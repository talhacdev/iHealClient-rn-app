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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import editIcon from '../../assests/editColor.png';
import trash from '../../assests/trash2.png';
import location from '../../assests/location.png';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getOrders,
  deleteOrder,
  editOrder,
  removeEditOrder,
} from '../../actions/orders';

import Loader from '../general/Loader';
import CompletedOrders from './CompletedOrders';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
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
class Home extends Component {
  constructor() {
    super();
    this.state = {
      loader: true,
      tab: 0,
    };
  }
  componentDidMount = () => {
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.getOrdersFun();
      this.props.removeEditOrder();
    });
  };
  componentWillUnmount() {
    this.willFocus.remove();
  }
  getOrdersFun = () => {
    const {user, getOrders} = this.props;
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    new Promise((rsl, rej) => {
      getOrders(data, rsl, rej);
    })
      .then(() => {
        this.setState({loader: false});
      })
      .catch(err => {
        this.setState({loader: false});
        Alert.alert('Sorry', err);
      });
  };
  deleteItem = item => {
    Alert.alert('iHeal', 'Are you sure you want to delete?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => this.deleteFun(item),
      },
    ]);
  };
  deleteFun = item => {
    this.setState({loader: true});
    const {user, deleteOrder} = this.props;
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    data.append('orderid', item.order_id);
    new Promise((rsl, rej) => {
      deleteOrder(data, rsl, rej);
    })
      .then(() => {
        this.getOrdersFun();
      })
      .catch(err => {
        this.setState({loader: false});
        Alert.alert('Sorry', err);
      });
  };
  edit = item => {
    console.log(item);
    const {phone_no, session} = this.props.user;
    this.props.navigation.navigate('Category', {item: item, from: 'edit'});
    // const data = new FormData();
    // data.append('phone_no', phone_no);
    // data.append('session_key', session);
    // data.append('orderid', item.order_id);
    // this.setState({loader: true});
    // new Promise((rsl, rej) => {
    //   this.props.editOrder(data, rsl, rej);
    // })
    //   .then(() => {
    //     this.setState({loader: false});
    //     this.props.navigation.push('Home', {edit: true});
    //   })
    //   .catch(err => {
    //     this.setState({loader: false});
    //     Alert.alert('Sorry', err);
    //   });
  };
  loaderFun = () => {
    this.setState({loader: !this.state.loader});
  };
  render() {
    const {orders} = this.props;
    console.log('ordersr', orders);
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="menu"
              size={27}
              color={'white'}
              onPress={() => {
                this.props.navigation.toggleDrawer();
              }}
            />
          }
          centerComponent={<Text style={[styles.texthome]}>Orders</Text>}
        />
        <View style={{width: '90%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => this.setState({tab: 0})}
              style={[
                styles.scheduleContainer,
                {
                  borderBottomColor:
                    this.state.tab == 1 ? 'black' : colors.primary,
                },
              ]}>
              <Text style={styles.schedule}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({tab: 1})}
              style={[
                styles.scheduleContainer,
                {
                  borderBottomColor:
                    this.state.tab == 0 ? 'black' : colors.primary,
                },
              ]}>
              <Text style={[styles.schedule, {textAlign: 'right'}]}>
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: '90%', flex: 3, alignItems: 'center'}}>
          {this.state.tab == 1 ? (
            <CompletedOrders
              loaderFun={this.loaderFun}
              navigation={this.props.navigation}
            />
          ) : orders !== undefined ? (
            orders.map((item, i) => {
              let date = item.order_execution_date.split('-');
              console.log('DEBUG ORDER ITEM: ', item);
              return (
                <View style={styles.orderContainer} key={i}>
                  <View style={styles.orderListContainer}>
                    <View>
                      <Text
                        style={styles.text}
                        onPress={() => {
                          JSON.stringify(item);
                        }}>
                        Order id {item.order_id}
                      </Text>
                      <Text style={styles.text}>{item.from_time}</Text>
                      <Text numberOfLines={1} style={styles.text}>
                        {MONTHS[date[1] - 1]}{' '}
                        {date[2]?.split(' ')[0] + ' ' + date[0]}, {item.time}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.orderIconsContainer}>
                    {/* <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('Message', {job: item})
                      }>
                      <MaterialCommunityIcons
                        name="chat"
                        size={28}
                        color={colors.primary}
                      />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => this.edit(item)}>
                      <Image
                        source={editIcon}
                        resizeMode="contain"
                        style={styles.orderIcon}
                      />
                    </TouchableOpacity> */}
                    {item.assigned_to == 0 ? (
                      <TouchableOpacity onPress={() => this.deleteItem(item)}>
                        <Image
                          source={trash}
                          resizeMode="contain"
                          style={styles.orderIcon}
                        />
                      </TouchableOpacity>
                    ) : null}

                    {item.assigned_to == 0 ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item);
                          item?.lat
                            ? this.props.navigation.navigate('Map1', {item})
                            : Alert.alert('iHeal', 'Location Not Found');
                        }}>
                        <Image
                          source={location}
                          resizeMode="contain"
                          style={styles.orderIcon}
                        />
                      </TouchableOpacity>
                    )}

                    {/* <TouchableOpacity
                      onPress={() => {
                        console.log(item);
                        item?.lat
                          ? this.props.navigation.navigate('Map1', {item})
                          : Alert.alert('iHeal', 'Location Not Found');
                      }}>
                      <Image
                        source={location}
                        resizeMode="contain"
                        style={styles.orderIcon}
                      />
                    </TouchableOpacity> */}
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.noOrderContainer}>
              <Text style={styles.noOrdeText}>
                You don't have any active orders yet
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          mode="contained"
          // onPress={() => this.props.navigation.navigate('Home')}
          onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Text style={styles.primaryText}>New Order</Text>
        </TouchableOpacity>
        {this.state.loader && <Loader />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    orders: state.ordersReducer.orders,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOrders,
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
)(Home);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  texthome: {
    color: 'white',

    fontSize: 15,

    fontFamily,
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

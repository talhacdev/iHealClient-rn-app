import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import colors from '../../assests/styles';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import Logo from '../../assests/header_logo.jpg';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getRangeTypes,
  getBrands,
  cart,
  getFilter,
  insertOrder,
} from '../../actions/orders';

import Loader from '../general/Loader';
const liters = [0, 1, 2, 3];
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-simple-modal';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

class Additional extends Component {
  constructor() {
    super();
    this.state = {
      filter: {price: '0'},
      loader: true,
      oilFilter: false,
      airFilter: false,
      battery: false,
      gayeroil: false,
      model: false,
      additional: 0,
      total: 0,
    };
  }
  componentDidMount() {
    const {cartData, getFilter, user, navigation, edit_order} = this.props;
    const edit = navigation.getParam('edit');
    try {
      let {currentDate, currentMonth, currentYear} = cartData;
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

      if (edit) {
        this.setState({additional: edit_order.additional_litres, edit: true});
      }
      new Promise((rsl, rej) => {
        getFilter(
          user.phone_no,
          user.session,
          cartData.vehicle.model,
          date,
          rsl,
          rej,
        );
      })
        .then(additionals => {
          if (edit) {
            if (edit_order.itemdetails.length > 0) {
              edit_order.itemdetails.map(item => {
                this.setState({
                  [item.brand_id]: true,
                  total: this.state.total + JSON.parse(item.price),
                });
              });
            }
          }
          this.setState({loader: false, additionals});
        })
        .catch(err => {
          this.setState({loader: false});
          if (err == 'No Record Found.') {
            this.setState({loader: false});
          } else {
            Alert.alert('Sorry', err, [
              {
                text: 'Go Back',
                onPress: () => navigation.goBack(),
              },
            ]);
          }
        });
    } catch {}
  }
  handler = () => {
    const {navigation, cartData, cart} = this.props;
    const {additional, additionals, edit} = this.state;

    const additionalItems = [];
    if (additionals) {
      additionals.map((item, i) => {
        if (this.state[item.brand_id]) {
          additionalItems.push(item);
        }
      });
    }
    const data = {
      ...cartData,
      additionalItems,
      additionalLitters: additional,
    };
    cart(data);
    edit
      ? navigation.navigate('Invoice', {edit: true})
      : navigation.navigate('Invoice');
  };
  setItem = (item, i) => {
    const {total} = this.state;
    if (this.state[item.brand_id]) {
      this.setState({[item.brand_id]: false});
      this.setState({total: total - JSON.parse(item.price)});
    } else {
      this.setState({[item.brand_id]: true});
      this.setState({total: total + JSON.parse(item.price)});
    }
  };

  render() {
    if (this.state.loader) {
      return <Loader />;
    }
    const {cartData} = this.props;
    const {additionals, total, additional} = this.state;
    const oneLiter = cartData.selectedBrand.price / 4;
    let suffix = 'th';
    if (
      cartData.currentDate == 1 ||
      cartData.currentDate == 21 ||
      cartData.currentDate == 31
    ) {
      suffix = 'st';
    }
    if (cartData.currentDate == 2 || cartData.currentDate == 22) {
      suffix = 'nd';
    }
    if (cartData.currentDate == 3 || cartData.currentDate == 23) {
      suffix = 'rd';
    }
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.container}
          style={{
            width: DEVICE_WIDTH > 700 ? '90%' : '100%',
            flex: 3,
          }}>
          <View style={styles.wrapper}>
            <Image source={Logo} style={styles.image} resizeMode="contain" />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.title}>{cartData.currentDate}</Text>
              <Text
                style={{
                  fontSize: DEVICE_HEIGHT > 600 ? 12 : 8,
                  lineHeight: DEVICE_HEIGHT > 600 ? 12 : 0,
                  color: colors.camera,
                  fontFamily,
                }}>
                {suffix}
              </Text>
              <Text style={styles.title}>
                {' '}
                {months[cartData.currentMonth]}. {cartData.currentYear}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>
                {cartData.vehicle.car_make} {cartData.vehicle.model_name}
              </Text>
            </View>
            <Text
              style={{
                color: colors.camera,
                fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
                fontFamily,
              }}>
              {cartData.vehicle.plate_code} {cartData.vehicle.plate_no}
            </Text>
            <View
              style={[
                styles.address,
                {
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                },
              ]}>
              <Text style={[styles.title, {lineHeight: 22}]}>
                Address: ({cartData.address.name}) {cartData.address.address}
              </Text>
            </View>
            <View>
              <Text style={styles.previousText}>Selected Items</Text>
              <View style={styles.previousWrapper}>
                <Text style={styles.previousText}>Service Charges</Text>
                <Text style={styles.previousText}>
                  {cartData.selectedSlot.price} AED
                </Text>
              </View>
              <View style={styles.previousWrapper}>
                <Text style={styles.previousText}>
                  {cartData.selectedBrand.itemname}/Ltr
                </Text>
                <Text style={styles.previousText}>
                  {JSON.parse(cartData.selectedBrand.price) / 4} AED
                </Text>
              </View>
              <View style={styles.previousWrapper}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.previousText}>Additional Liters</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({model: true})}
                    style={{
                      backgroundColor: colors.inputFields,
                      width: DEVICE_HEIGHT > 600 ? 50 : 30,
                      paddingHorizontal: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text style={styles.previousText}>{additional}</Text>
                    <Icon name="triangle-down" size={15} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.previousText}>
                  {additional * oneLiter} AED
                </Text>
              </View>
              {additionals == undefined && (
                <View style={styles.previousWrapper}>
                  <Text style={styles.previousText}>Total</Text>
                  <Text style={styles.previousText}>
                    {(
                      total +
                      additional * oneLiter +
                      JSON.parse(cartData.selectedSlot.price) +
                      JSON.parse(cartData.selectedBrand.price)
                    ).toFixed(2)}{' '}
                    AED
                  </Text>
                </View>
              )}
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={styles.tableContainer}>
                {additionals !== undefined && (
                  <View style={[styles.address, {marginBottom: 20}]}>
                    <Text
                      style={[
                        styles.title,
                        {fontSize: 18, width: '50%', textAlign: 'center'},
                      ]}>
                      Select
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {fontSize: 18, width: '50%', textAlign: 'center'},
                      ]}>
                      Price
                    </Text>
                  </View>
                )}
                <View style={styles.table}>
                  {additionals !== undefined &&
                    additionals.map((item, i) => {
                      return (
                        <View key={i} style={styles.tableData}>
                          <View style={styles.center}>
                            <TouchableOpacity
                              onPress={() => this.setItem(item, i)}
                              style={styles.checkbox}>
                              {this.state[item.brand_id] && (
                                <Icon name="check" />
                              )}
                            </TouchableOpacity>
                            <Text style={[styles.title, styles.titleBorder]}>
                              {item.itemname}
                            </Text>
                          </View>
                          <Text style={[styles.title, styles.titleBorder]}>
                            {JSON.parse(item.price).toFixed(2)} AED
                          </Text>
                        </View>
                      );
                    })}
                </View>
                {additionals !== undefined && (
                  <View style={[styles.address, {marginBottom: 20}]}>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
                          width: '50%',
                          textAlign: 'center',
                        },
                      ]}>
                      Total
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
                          width: '50%',
                          textAlign: 'center',
                        },
                      ]}>
                      {(
                        total +
                        additional * oneLiter +
                        JSON.parse(cartData.selectedSlot.price) +
                        JSON.parse(cartData.selectedBrand.price)
                      ).toFixed(2)}{' '}
                      AED
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.container,
            {
              marginBottom: DEVICE_HEIGHT > 600 ? 30 : 10,
              width: DEVICE_WIDTH > 700 ? '90%' : '100%',
            },
          ]}>
          <TouchableOpacity
            style={styles.primaryBtn}
            mode="contained"
            onPress={() => this.handler()}>
            <Text style={styles.primaryText}>Continue</Text>
          </TouchableOpacity>
        </View>
        {this.state.model && (
          <Modal
            open={this.state.model}
            modalDidClose={() => {
              this.setState({model: false});
            }}>
            <ScrollView>
              {liters.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      this.setState({model: false, additional: item});
                    }}>
                    <Text style={{padding: 10, fontFamily}}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </Modal>
        )}
      </View>
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
      getRangeTypes,
      getBrands,
      cart,
      getFilter,
      insertOrder,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Additional);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    borderRightWidth: 1.5,
    borderRightColor: colors.inputFields,
    justifyContent: 'center',
  },
  image: {
    width: DEVICE_HEIGHT > 600 ? 150 : 120,
    height: DEVICE_HEIGHT > 600 ? 50 : 30,
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: DEVICE_HEIGHT > 600 ? 14 : 10,
    fontFamily,
  },
  titleBorder: {
    width: '50%',
    paddingVertical: 15,
    textAlign: 'center',
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 10,
  },
  previousWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  previousText: {
    fontFamily,
    fontSize: DEVICE_HEIGHT > 600 ? 14 : 12,
  },
  tableContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    width: '90%',
  },
  table: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.inputFields,
    borderBottomColor: colors.inputFields,
  },
  tableData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.inputFields,
    borderBottomColor: colors.inputFields,
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    width: DEVICE_HEIGHT > 600 ? 25 : 15,
    height: DEVICE_HEIGHT > 600 ? 20 : 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 10 : 0,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    fontFamily,
  },
});

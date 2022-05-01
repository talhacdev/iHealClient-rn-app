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
import {logo} from '../../assests/index';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getRangeTypes,
  getBrands,
  cart,
  getFilter,
  insertOrder,
  updateOrder,
} from '../../actions/orders';
import {placeOrder} from '../../actions/app';

import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../general/Loader';
import moment from 'moment';

class InVoice extends Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      total: 0,
      litters: 0,
      subCategory: '',
    };
  }

  componentDidMount() {
    const json = this.props.navigation.getParam('json');

    var stringName = '';

    for (let i = 0; i < json.sub_cat_id.length; i++) {
      if (stringName == '') {
        console.log('DEBUG test string: ', json.sub_cat_id[i]);
        stringName = json.sub_cat_id[i].name;
      } else {
        stringName = stringName + '\n' + json.sub_cat_id[i].name;
      }
    }

    console.log('DEBUG JSON stringName: ', stringName);
    this.setState({subCategory: stringName});
  }

  handler = async () => {
    console.log('DEBUG handler');
    // try {
    //   const json = this.props.navigation.getParam('json');
    //   json.from === 'edit'
    //     ? this.confirmOrder()
    //     : this.props.navigation.navigate('Finding', {
    //         json,
    //       });
    // } catch (err) {}

    this.confirmOrder();

    // this.props.navigation.navigate('Confirmed');
  };
  confirmOrder = async () => {
    try {
      const json = this.props.navigation.getParam('json');

      console.log('DEBUG confirmOrder JSON', json);
      const formData = new FormData();

      var string = '';

      for (let i = 0; i < json.sub_cat_id.length; i++) {
        if (string == '') {
          console.log('DEBUG test string: ', json.sub_cat_id[i]);
          string = json.sub_cat_id[i].id;
        } else {
          string = string + ',' + json.sub_cat_id[i].id;
        }
      }
      console.log('DEBUG JSON string: ', string);

      formData.append(
        'data',
        JSON.stringify({
          time: json.time,
          date: json.date,
          cat_id: json.cat_id,
          // sub_cat_id: json.sub_cat_id.id,
          sub_cat_id: string,
          des: json.des,
          address: json.address,
          lat: json.lat,
          long: json.long,
          order_id: json.from === 'edit' ? json.item.order_id : '',
        }),
      );

      // formData.append('time', json.time);
      // formData.append('date', json.date);
      // formData.append('lat', json.lat);
      // formData.append('long', json.long);
      // formData.append('des', json.des);
      // formData.append('address', json.address);
      // formData.append('cat_id', json.cat_id);
      // formData.append('sub_cat_id', json.sub_cat_id.id);

      console.log('DEBUG confirmOrder formData: >', formData);

      const res = await this.props.placeOrder(
        formData,
        json.phone_no,
        json.session_key,
      );
      if (res.data.status) {
        console.log('DEBUG confirmOrder response: ', res);
        Alert.alert('iHeal', 'Order Placed', [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('Dashboard'),
          },
        ]);

        // Alert.alert('iHeal', res.data.message);
      } else {
        Alert.alert('iHeal', res.data.message);
      }
    } catch (err) {}
  };
  //   handler = () => {
  //     const {
  //       user,
  //       cartData,
  //       insertOrder,
  //       navigation,
  //       edit_order,
  //       updateOrder,
  //     } = this.props;
  //     const data = new FormData();
  //     const edit = navigation.getParam('edit');
  //     this.setState({loader: true});

  //     let month = currentMonth + 1;
  //     if (month == 13) {
  //       month = '01';
  //     }
  //     if (month < 10) {
  //       month = `0${month}`;
  //     }
  //     if (currentDate < 10) {
  //       currentDate = `0${currentDate}`;
  //     }
  //     let date = `${currentYear}-${month}-${currentDate}`;
  //     let netPrice =
  //       JSON.parse(selectedBrand.price) + JSON.parse(selectedSlot.price);
  //     if (additionalLitters > 0) {
  //       netPrice =
  //         netPrice + (additionalLitters * JSON.parse(selectedBrand.price)) / 4;
  //     }
  //     let items = [JSON.parse(selectedBrand.brand_id)];
  //     let prices = [JSON.parse(selectedBrand.price)];
  //     additionalItems.map(item => {
  //       items.push(JSON.parse(item.brand_id));
  //       prices.push(JSON.parse(item.price));
  //       netPrice = netPrice + JSON.parse(item.price);
  //     });
  //     data.append('phone_no', user.phone_no);
  //     data.append('session_key', user.session);
  //     data.append('vehicle_id', vehicle.vehicle_id);
  //     data.append('timeslot', selectedSlot.id);
  //     data.append('timeslot_price', selectedSlot.price);
  //     data.append('location_id', address.location_id);
  //     data.append('date', date);
  //     data.append('type', type.id);
  //     data.append('net_payable', netPrice);
  //     data.append('additional_litters', additionalLitters);
  //     data.append(
  //       'additional_litters_price',
  //       (additionalLitters * JSON.parse(selectedBrand.price)) / 4,
  //     );
  //     data.append('items', JSON.stringify(items));
  //     data.append('prices', JSON.stringify(prices));
  //     if (edit) {
  //       data.append('order_id', edit_order.order_id);
  //       new Promise((rsl, rej) => {
  //         updateOrder(data, rsl, rej);
  //       })
  //         .then(res => {
  //           Alert.alert('iHeal', 'Order has been updated.');
  //           navigation.popToTop();
  //         })
  //         .catch(err => {
  //           this.setState({loader: false});
  //           Alert.alert('Sorry!', err);
  //         });
  //     } else {
  //       new Promise((rsl, rej) => {
  //         insertOrder(data, rsl, rej);
  //       })
  //         .then(res => {
  //           this.setState({loader: false});
  //           navigation.navigate('PaymentHome');
  //         })
  //         .catch(err => {
  //           this.setState({loader: false});
  //           Alert.alert('Sorry!', err);
  //         });
  //     }
  //   };
  render() {
    const json = this.props.navigation.getParam('json');
    console.log('json: ', json);
    if (this.state.loader) {
      return <Loader />;
    }
    const {cartData, navigation} = this.props;
    const {total, litters} = this.state;
    const edit = navigation.getParam('edit');
    let suffix = 'th';
    // if (
    //   cartData.currentDate == 1 ||
    //   cartData.currentDate == 21 ||
    //   cartData.currentDate == 31
    // ) {
    //   suffix = 'st';
    // }
    // if (cartData.currentDate == 2 || cartData.currentDate == 22) {
    //   suffix = 'nd';
    // }
    // if (cartData.currentDate == 3 || cartData.currentDate == 23) {
    //   suffix = 'rd';
    // }
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="arrow-back"
              size={27}
              color={'white'}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          centerComponent={<Text style={[styles.texthome]}>Invoice</Text>}
        />
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.container}
          style={{
            width: DEVICE_WIDTH > 700 ? '90%' : '100%',
            flex: 3,
          }}
          keyboardShouldPersistTaps="always">
          <View style={styles.wrapper}>
            <Image source={logo} style={styles.image} resizeMode="contain" />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={styles.title}>
                {json && moment(json.date).format('L')}
              </Text>
              <Text
                style={{
                  fontSize: DEVICE_HEIGHT > 600 ? 12 : 8,
                  lineHeight: DEVICE_HEIGHT > 600 ? 12 : 0,
                  color: colors.camera,
                  fontFamily,
                }}>
                {suffix}
              </Text>
            </View>

            <Text style={[styles.title, {marginBottom: 30, lineHeight: 22}]}>
              Address: {json && json.address}
            </Text>
            <View style={styles.tableContainer}>
              <View style={[styles.address, {marginBottom: 20}]}>
                <Text style={[styles.title, {fontSize: 18}]}>Items</Text>
                <Text style={[styles.title, {fontSize: 18}]}>Detail</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableData}>
                  <View
                    style={[
                      styles.titleBorder,
                      {
                        borderRightWidth: 1.5,
                        borderRightColor: colors.inputFields,
                      },
                    ]}>
                    <Text style={[styles.title]}> Main Category</Text>
                  </View>
                  <Text
                    style={[
                      styles.title,
                      styles.titleBorder,
                      {
                        textAlign: 'right',
                      },
                    ]}>
                    {json && json.name}
                  </Text>
                </View>

                <View style={styles.tableData}>
                  <View
                    style={[
                      styles.titleBorder,
                      {
                        borderRightWidth: 1.5,
                        borderRightColor: colors.inputFields,
                      },
                    ]}>
                    <Text style={[styles.title]}>Sub Category</Text>
                  </View>

                  <Text
                    style={[
                      styles.title,
                      styles.titleBorder,
                      {
                        textAlign: 'right',
                      },
                    ]}>
                    {/* {JSON.parse(cartData.selectedBrand.price) / 4} AED */}
                    {/* {json && json.sub_cat_id.name} */}
                    {json && this.state.subCategory}
                  </Text>
                </View>
                <View style={styles.tableData}>
                  <View
                    style={[
                      styles.titleBorder,
                      {
                        borderRightWidth: 1.5,
                        borderRightColor: colors.inputFields,
                      },
                    ]}>
                    <Text style={[styles.title]}>Time</Text>
                  </View>
                  <Text
                    style={[
                      styles.title,
                      styles.titleBorder,
                      {
                        textAlign: 'right',
                      },
                    ]}>
                    {json && json.time}
                  </Text>
                </View>
              </View>
              <Text style={[styles.caption, {fontSize: 12}]}>
                Description:{json && json.des}
              </Text>
            </View>

            {/* <View>
              <Text style={styles.caption}>
                Above prices includes 4Litres of oil change only. Any additional
                Liters of oil is subject to additional charges. All Terms and
                Condition agreed upon.
              </Text>
            </View> */}
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
            {json?.from === 'edit' ? (
              <Text style={styles.primaryText}>Update</Text>
            ) : (
              <Text style={styles.primaryText}>Confirm Order</Text>
            )}
          </TouchableOpacity>
        </View>
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
      updateOrder,
      placeOrder,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InVoice);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  texthome: {
    color: 'white',
    fontFamily,
    fontSize: 20,
  },
  wrapper: {
    backgroundColor: colors.secondary,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    paddingVertical: 10,
  },
  address: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tableContainer: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.inputFields,
    paddingBottom: 20,
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
    // alignItems: 'center',
  },
  caption: {
    color: colors.locationiIcon,
    fontSize: DEVICE_HEIGHT > 1000 ? 12 : 7.5,
    marginTop: 10,
    fontFamily,
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

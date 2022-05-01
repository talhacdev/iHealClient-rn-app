import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../assests/styles';
import Oil from '../../assests/oil.png';
import {FlatList} from 'react-native-gesture-handler';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getRangeTypes, getBrands, cart} from '../../actions/orders';

import Loader from '../general/Loader';
import {store_url} from '../../config/config';

class OilSelection extends Component {
  constructor() {
    super();
    this.state = {
      loaderBrands: false,
      filter: true,
      loader: true,
      brand: null,
      zIndex: true,
    };
  }
  componentDidMount() {
    const {
      user,
      getRangeTypes,
      navigation,
      edit_order,
      getBrands,
      cartData,
    } = this.props;
    const {phone_no, session, name, u_id} = user;

    try {
      const edit = navigation.getParam('edit');

      if (edit) {
        const {type, oil_brand_id} = edit_order;
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
        new Promise((rsl, rej) => {
          getBrands(phone_no, session, type, date, rsl, rej);
        })
          .then(res => {
            this.setState({brands: res, edit: true});
            res.map(item => {
              if (item.brand_id == oil_brand_id) {
                this.setState({brand: item.brand_id, selectedBrand: item});
              }
            });
          })
          .catch(err => {
            Alert.alert('Oops!', err);
            this.setState({loaderBrands: false});
          });
      }
      new Promise((rsl, rej) => {
        getRangeTypes(phone_no, session, rsl, rej);
      })
        .then(ranges => {
          this.setState({ranges});
          if (edit) {
            ranges.map(item => {
              if (item.id == edit_order.type) {
                this.setState({
                  selectedRange: item.id,
                  loaderBrands: true,
                  type: item,
                });
              }
            });
          }
        })
        .catch(err => {
          Alert.alert('Sorry', err);
        });
    } catch {
      console.log('res');
    }
  }
  selectedType = item => {
    const {user, getBrands, cartData} = this.props;
    const {phone_no, session, name, u_id} = user;
   
    this.setState({
      selectedRange: item.id,
      loaderBrands: true,
      brands: undefined,
      brand: null,
      type: item,
    });
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

    new Promise((rsl, rej) => {
      getBrands(phone_no, session, item.id, date, rsl, rej);
    })
      .then(brands => {
        this.setState({brands});
      })
      .catch(err => {
        Alert.alert('Oops!', err);
        this.setState({loaderBrands: false});
      });
  };
  handler = () => {
    const {selectedBrand, filter, type, edit} = this.state;
    const {navigation, cartData, cart, user} = this.props;
    let data = {
      ...cartData,
      selectedBrand,
      filter,
      type,
    };
   
    cart(data);
    edit
      ? navigation.navigate('Additional', {edit: true})
      : navigation.navigate('Additional');
  };
  render() {
    const {
      ranges,
      brands,
      filter,
      loaderBrands,
      brand,
      selectedRange,
    } = this.state;
    if (!ranges) {
      return <Loader />;
    }
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <ScrollView
          scrollEnabled={DEVICE_WIDTH > 350 ? false : true}
          nestedScrollEnabled
          style={{width: DEVICE_WIDTH > 700 ? '90%' : '100%', flex: 1}}>
          <View style={styles.container}>
            <View>
              {/* Oil Type */}
              <View style={styles.border}>
                <View style={styles.header}>
                  <View style={styles.header}>
                    <Text
                      style={[
                        styles.headerText,
                        {fontSize: DEVICE_WIDTH > 350 ? 17 : 13},
                      ]}>
                      Select Oil Type{' '}
                    </Text>
                    <Text
                      style={[
                        styles.headerText,
                        {fontSize: DEVICE_WIDTH > 350 ? 14 : 10},
                      ]}>
                      (Oil Drain Interval-ODI)
                    </Text>
                  </View>
                  <Image
                    source={Oil}
                    style={styles.oilIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.kmsBtnContainer}>
                  <View style={styles.kmsBtnWrapper}>
                    {ranges !== undefined &&
                      ranges.map((item, i) => {
                        return (
                          <Button
                            mode="contained"
                            key={i}
                            style={[
                              styles.kmsBtn,
                              {
                                borderWidth: selectedRange == item.id ? 1 : 0,
                                borderColor: 'black',
                              },
                            ]}
                            onPress={() => this.selectedType(item)}>
                            <Text style={styles.kmsText}>{item.name} Kms</Text>
                          </Button>
                        );
                      })}
                  </View>
                </View>
              </View>
              {/* Oil Selection */}
              {loaderBrands && (
                <>
                  <View style={styles.header}>
                    <Text
                      style={[
                        styles.headerText,
                        {fontSize: DEVICE_WIDTH > 350 ? 17 : 13},
                      ]}>
                      Select Oil Brand{' '}
                    </Text>
                    <Image
                      source={Oil}
                      style={styles.oilIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    {brands !== undefined ? (
                      <FlatList
                        nestedScrollEnabled
                        numColumns={3}
                        style={{
                          height:
                            DEVICE_WIDTH > 700
                              ? DEVICE_HEIGHT * 0.58
                              : DEVICE_WIDTH < 500
                              ? DEVICE_HEIGHT * 0.35
                              : DEVICE_HEIGHT * 0.45,
                          width: '90%',
                          flex: 1,
                        }}
                        data={brands}
                        renderItem={({item, i}) => {
                          return (
                            <TouchableOpacity
                              key={i}
                              style={{
                                borderWidth:
                                  brand == item.brand_id
                                    ? 2
                                    : StyleSheet.hairlineWidth,
                                margin: '1.5%',
                                width: '30%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}
                              onPress={() =>
                                this.setState({
                                  brand: item.brand_id,
                                  selectedBrand: item,
                                })
                              }>
                              <Image
                                source={{uri: `${store_url}/${item.img}`}}
                                style={{
                                  width:
                                    DEVICE_WIDTH < 380
                                      ? DEVICE_WIDTH * 0.2
                                      : DEVICE_WIDTH * 0.15,
                                  height:
                                    DEVICE_WIDTH < 380
                                      ? DEVICE_WIDTH * 0.2
                                      : DEVICE_WIDTH * 0.15,
                                  flex: 1,
                                }}
                                resizeMode="contain"
                                onLoad={() => {
                                  this.setState({zIndex: false});
                                }}
                              />
                              {this.state.zIndex && (
                                <ActivityIndicator
                                  style={{position: 'absolute'}}
                                />
                              )}
                            </TouchableOpacity>
                          );
                        }}
                      />
                    ) : (
                      <View style={{marginTop: 50}}>
                        <ActivityIndicator color={colors.number} size={50} />
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
        {selectedRange && brand && (
          <View
            style={[
              styles.container,
              {marginBottom: DEVICE_WIDTH > 350 ? 30 : 0},
            ]}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => this.handler()}>
              <Text style={styles.primaryText}>Continue</Text>
            </TouchableOpacity>
          </View>
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
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OilSelection);

const fontFamily = colors.font;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  border: {
    borderBottomColor: colors.inputFields,
    borderBottomWidth: 2.5,
    paddingBottom: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: colors.camera,
    fontFamily,
  },
  oilIcon: {
    width: 40,
    height: 40,
  },
  kmsBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  kmsBtnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: DEVICE_WIDTH > 700 ? '60%' : '100%',
  },
  kmsBtn: {
    backgroundColor: colors.inputFields,
    width: DEVICE_WIDTH > 350 ? 140 : 105,
    height: DEVICE_WIDTH > 350 ? 50 : 40,
    margin: DEVICE_WIDTH > 350 ? 10 : 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kmsText: {
    color: colors.camera,
    fontSize: DEVICE_WIDTH > 350 ? 14 : 10,
    fontFamily,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oilSelectionContainer: {
    alignItems: 'center',
    // backgroundColor:'blue'
  },
  oilWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    flexWrap: 'wrap',
    // justifyContent: 'center',
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    marginTop: 10,
    borderRadius: 10,
    height: DEVICE_WIDTH > 350 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_WIDTH > 350 ? 22 : 18,
    fontFamily,
  },
});

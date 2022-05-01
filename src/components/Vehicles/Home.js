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
  ActivityIndicator,
} from 'react-native';

import colors from '../../assests/styles';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import edit from '../../assests/editColor.png';
import trash from '../../assests/trash2.png';
const fontFamily = colors.font;
import AddVehicle from '../general/addVehicle';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getVehicles, delVehicle} from '../../actions/vechicles';

import Loader from '../general/Loader';
import otherImage from '../../assests/other.png';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loader: false,
      noVehicle: false,
      zIndex: true,
    };
  }
  componentDidMount() {
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.getVehiclesFun();
    });
  }
  getVehiclesFun = () => {
    const {user, getVehicles} = this.props;
    new Promise((rsl, rej) => {
      getVehicles(user.phone_no, user.session, rsl, rej);
    })
      .then(res => {
        this.setState({loader: false});
      })
      .catch(err => {
        if (err == 'No Data found.') {
          this.setState({noVehicle: true, loader: false});
        }
      });
  };
  deleteItem = item => {
    Alert.alert('iHeal', 'Are you sure you want to delete?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => this.deleteVehicle(item),
      },
    ]);
  };
  deleteVehicle = item => {
    this.setState({loader: true});
    const {user, delVehicle} = this.props;
    new Promise((rsl, rej) => {
      delVehicle(user.phone_no, user.session, item.vehicle_id, rsl, rej);
    })
      .then(res => {
        this.getVehiclesFun();
        Alert.alert('Success', res);
      })
      .catch(err => {
        Alert.alert('Sorry', err);
      });
  };
  render() {
    const {vehicles, navigation} = this.props;
    const {loader, noVehicle, zIndex} = this.state;
    return (
      <>
        {vehicles !== undefined || noVehicle ? (
          <>
            <ScrollView contentContainerStyle={styles.container}>
              {!noVehicle && (
                <>
                  {vehicles.map((item, i) => {
                    return (
                      <View
                        key={i}
                        style={[
                          styles.vehicleContainer,
                          {
                            // marginRight: i % 2 !== 0 ? 0 : 8,
                            // marginLeft: i % 2 == 0 ? 0 : 8
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('VehicleHistory', {
                              vehicle_id: item.vehicle_id,
                            })
                          }
                          style={styles.vehicleListContainer}>
                          {item.color !== 'other' ? (
                            <View
                              style={{
                                backgroundColor: item.color,
                                width: DEVICE_HEIGHT > 600 ? 50 : 40,
                                height: DEVICE_HEIGHT > 600 ? 50 : 40,
                                borderRadius: 50,
                                //  elevation:5
                              }}
                            />
                          ) : (
                            <View
                              style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                // source={{ uri: `${store_url}/${item.make_image}` }}
                                source={otherImage}
                                style={{
                                  width: DEVICE_HEIGHT > 600 ? 50 : 30,
                                  height: DEVICE_HEIGHT > 600 ? 50 : 30,
                                  borderRadius: 50,
                                }}
                                onLoad={() => this.setState({zIndex: false})}
                                // resizeMode='contain'
                              />
                              <ActivityIndicator
                                style={{position: 'absolute', zIndex: -1}}
                              />
                            </View>
                          )}
                          <View
                            style={{marginLeft: 15, justifyContent: 'center'}}>
                            <Text style={styles.text}>
                              {item.car_make} {item.model_name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={[styles.text, {fontSize: 11}]}>
                              {item.plate_code} {item.plate_no}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <View style={styles.vehicleIconsContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('EditVehicle', {data: item})
                            }>
                            <Image
                              source={edit}
                              style={{
                                width: DEVICE_HEIGHT > 600 ? 30 : 20,
                                height: DEVICE_HEIGHT > 600 ? 30 : 20,
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => this.deleteItem(item)}>
                            <Image
                              source={trash}
                              style={{
                                width: DEVICE_HEIGHT > 600 ? 30 : 20,
                                height: DEVICE_HEIGHT > 600 ? 30 : 20,
                              }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </>
              )}
            </ScrollView>
            <View style={[styles.container, {}]}>
              <AddVehicle
                navigation={this.props.navigation}
                backgroundColor={colors.secondary}
              />
            </View>
            {loader && <Loader />}
          </>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.authReducer.user,
    vehicles: state.vehiclesReducer.vehicles,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getVehicles,
      delVehicle,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  vehicleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    alignItems: 'center',
    marginBottom: DEVICE_HEIGHT > 600 ? 20 : 10,
    padding: 10,
    backgroundColor: colors.secondary,
    paddingVertical: DEVICE_HEIGHT > 600 ? 10 : 5,
  },
  vehicleListContainer: {
    flexDirection: 'row',
    alignItems: DEVICE_HEIGHT > 600 ? 'flex-end' : 'center',
    width: '75%',
    overflow: 'hidden',
    marginRight: '4%',
  },
  text: {
    width: '100%',
    fontSize: DEVICE_HEIGHT > 600 ? 15 : 12,
    fontFamily,
  },
  vehicleIconsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: '20%',
  },
});

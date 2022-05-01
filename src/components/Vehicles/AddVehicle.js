import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import colors from '../../assests/styles';

import Loader from '../general/Loader';
import other from '../../assests/other.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-simple-modal';
import DisableKeyboard from '../general/DisableKeyboard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getStates,
  getMake,
  getModel,
  addVehicle,
} from '../../actions/vechicles';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const fontFamily = colors.font;

class AddVehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      plate_code: '',
      plate_number: '',
      emirate: null,
      colors: [
        {
          color: 'white',
          name: 'White',
        },
        {
          color: 'black',
          name: 'Black',
        },
        {
          color: 'silver',
          name: 'Silver',
        },
        {
          color: 'grey',
          name: 'Grey',
        },
        {
          color: 'skyblue',
          name: 'Sky Blue',
        },
        {
          color: 'blue',
          name: 'Blue',
        },
        {
          color: 'red',
          name: 'Red',
        },
        {
          color: 'brown',
          name: 'Brown',
        },
        {
          color: 'yellow',
          name: 'Yellow',
        },
        {
          color: 'orange',
          name: 'Orange',
        },
        {
          color: 'green',
          name: 'Green',
        },
      ],
      selectedColor: 0,
      openModel: false,
      modelFunction: null,
      loader: true,
      years: [],
      selectedYear: null,
      yearModal: false,
      addSeperator: false,
    };
  }
  yearsFun = () => {
    var currentYear = new Date().getFullYear();
    var years = [];
    for (var i = 1970; i <= currentYear; i++) {
      years.push(i);
    }

    this.setState({years});
  };
  componentDidMount() {
    const {user, getStates} = this.props;

    this.yearsFun();
    new Promise((rsl, rej) => {
      getStates(user.phone_no, user.session, rsl, rej);
    })
      .then(res => {
        this.setState({emirate: res, loader: false});
      })
      .catch(err => Alert.alert('Sorry', err));
  }
  chooseOption = (item, i) => {
    const {user, getMake, getModel} = this.props;
    const {session, phone_no} = user;
    this.setState({
      [this.state.modelFunction]: item.state_name
        ? item.state_name
        : item.model_name
        ? item.model_name
        : item.name,
      [`${this.state.modelFunction}id`]: item.state_name
        ? item.state_id
        : item.model_name
        ? item.model_id
        : item.made_id,
      openModel: false,
      loader: true,
    });
    if (this.state.modelFunction == 'selectedEmirate') {
      new Promise((rsl, rej) => {
        getMake(phone_no, session, rsl, rej);
      })
        .then(res => {
          console.log(res);
          this.setState({make: res, loader: false});
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert('Err', 'Please Check your internet connection');
        });
    } else if (this.state.modelFunction == 'selectedMake') {
      this.setState({
        ['selectedModel']: null,
      });
      new Promise((rsl, rej) => {
        getModel(phone_no, session, item.made_id, rsl, rej);
      })
        .then(res => {
          this.setState({model: res, loader: false});
        })
        .catch(err => {
          Alert.alert('Sorry', err);
        });
    } else {
      this.setState({loader: false});
    }
  };
  handler = () => {
    const {plate_code, plate_number, selectedColor} = this.state;
    if (!plate_code) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (!plate_number) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (!selectedColor) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (!this.state['selectedEmirate']) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (!this.state['selectedMake']) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (!this.state['selectedModel']) {
      Alert.alert('iHeal', 'Please enter registration details first.');
    } else if (this.state.selectedYear == null) {
      Alert.alert('iHeal', 'Please select year first.');
    } else {
      Keyboard.dismiss();
      this.setState({loader: true});
      const {user, addVehicle, navigation} = this.props;
      const data = new FormData();
      const carType = navigation.getParam('carType');
      data.append('type', carType);
      data.append('plate_no', plate_number);
      data.append('plate_code', plate_code);
      data.append('color', selectedColor);
      data.append('make', this.state['selectedMakeid']);
      data.append('model', this.state['selectedModelid']);
      data.append('state_id', this.state['selectedEmirateid']);
      data.append('phone_no', user.phone_no);
      data.append('session_key', user.session);
      data.append('year', this.state.selectedYear);
      new Promise((rsl, rej) => {
        addVehicle(data, rsl, rej);
      })
        .then(res => {
          this.setState({loader: false});
          Alert.alert('iHeal', res);
          navigation.dispatch({
            type: 'CustomNav',
            routeName: 'VehiclesHome',
            key: 'VehiclesHome',
          });
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert('Sorry!', err);
        });

      // this.props.navigation.navigate('Lisence', { vehicle_data })
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <DisableKeyboard>
          <>
            <ScrollView
              contentContainerStyle={styles.container}
              scrollEnabled={true}
              keyboardShouldPersistTaps="handled">
              <View style={{width: '90%'}}>
                <View style={{alignSelf: 'flex-start', marginBottom: 10}}>
                  <Text style={styles.headerText}>Registration Details</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.setState({
                        modelFunction: 'selectedEmirate',
                        openModel: true,
                        data: this.state.emirate,
                      });
                    }}
                    style={styles.picker}>
                    {this.state['selectedEmirate'] ? (
                      <Text style={{fontFamily, color: colors.camera}}>
                        {this.state['selectedEmirate']}
                      </Text>
                    ) : (
                      <Text style={{fontFamily, color: colors.camera}}>
                        Emirate
                      </Text>
                    )}
                    <Icon name="angle-down" size={20} />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      placeholderTextColor={colors.camera}
                      style={styles.input}
                      placeholder="Plate Code"
                      value={this.state.plate_code}
                      onChangeText={plate_code => this.setState({plate_code})}
                      maxLength={10}
                      ref={input => {
                        this.plate_code = input;
                      }}
                      onSubmitEditing={() => this.plate_number.focus()}
                      returnKeyLabel="Next"
                    />
                    <TextInput
                      placeholderTextColor={colors.camera}
                      style={[styles.input, {width: '60%'}]}
                      placeholder="Plate number"
                      value={this.state.plate_number}
                      onChangeText={plate_number =>
                        this.setState({plate_number})
                      }
                      maxLength={10}
                      keyboardType="numeric"
                      ref={input => {
                        this.plate_number = input;
                      }}
                    />
                  </View>

                  <View style={{alignSelf: 'flex-start'}}>
                    <Text style={[styles.headerText, {marginTop: 50}]}>
                      Car Details
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.state.make != null
                        ? this.setState({
                            modelFunction: 'selectedMake',
                            openModel: true,
                            data: this.state.make,
                          })
                        : alert('Please enter registration details first.');
                    }}
                    style={[styles.picker, {marginVertical: 10}]}>
                    {this.state['selectedMake'] ? (
                      <Text style={{fontFamily, color: colors.camera}}>
                        {this.state['selectedMake']}
                      </Text>
                    ) : (
                      <Text style={{fontFamily, color: colors.camera}}>
                        Make
                      </Text>
                    )}
                    <Icon name="angle-down" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.state.model != null
                        ? this.setState({
                            modelFunction: 'selectedModel',
                            openModel: true,
                            data: this.state.model,
                          })
                        : alert('Please enter registration details first.');
                    }}
                    style={[styles.picker, {marginVertical: 10}]}>
                    {this.state['selectedModel'] ? (
                      <Text style={{fontFamily, color: colors.camera}}>
                        {this.state['selectedModel']}
                      </Text>
                    ) : (
                      <Text style={{fontFamily, color: colors.camera}}>
                        Model
                      </Text>
                    )}
                    <Icon name="angle-down" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      this.setState({yearModal: true});
                    }}
                    style={[styles.picker, {marginVertical: 10}]}>
                    {this.state.selectedYear ? (
                      <Text style={{fontFamily, color: colors.camera}}>
                        {this.state.selectedYear}
                      </Text>
                    ) : (
                      <Text style={{fontFamily, color: colors.camera}}>
                        Year
                      </Text>
                    )}
                    <Icon name="angle-down" size={20} />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%',
                      marginTop: 50,
                      justifyContent: 'space-evenly',
                    }}>
                    {this.state.colors.map((item, i) => {
                      return (
                        <View key={i} style={styles.colorsContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({selectedColor: item.color})
                            }
                            style={[
                              styles.colors,
                              {
                                backgroundColor: item.color,
                                borderWidth:
                                  this.state.selectedColor == item.color
                                    ? 1
                                    : 0,
                              },
                            ]}
                          />
                          <Text
                            style={{
                              fontFamily,
                              fontSize: DEVICE_HEIGHT > 600 ? 12 : 10,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      );
                    })}
                    <View style={styles.colorsContainer}>
                      <TouchableOpacity
                        onPress={() => this.setState({selectedColor: 'other'})}
                        style={[
                          styles.colors,
                          {
                            borderWidth:
                              this.state.selectedColor == 'other' ? 2 : 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                          },
                        ]}>
                        <Image
                          source={other}
                          style={{
                            width:
                              DEVICE_WIDTH > 500 ? 30 : DEVICE_WIDTH * 0.105,
                            height:
                              DEVICE_WIDTH > 500 ? 30 : DEVICE_WIDTH * 0.105,
                            borderRadius: 10,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: DEVICE_WIDTH > 380 ? 12 : 10,
                        }}>
                        Other
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  mode="contained"
                  onPress={() => this.handler()}>
                  <Text style={styles.primaryText}>Save My Vehicle</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {this.state.loader && <Loader />}
            {this.state.openModel && (
              <Modal
                modalDidOpen={() => Keyboard.dismiss()}
                open={this.state.openModel}
                modalDidClose={() => this.setState({openModel: false})}>
                <ScrollView>
                  {this.state.data.map((item, i) => {
                    return (
                      <View>
                        {item.fav == 0 && this.state.data[i - 1].fav == 1 && (
                          <View
                            key={i}
                            style={{
                              width: '100%',
                              height: 1,
                              borderBottomWidth: 1,
                              marginVertical: 5,
                              borderBottomColor: colors.inputFields,
                            }}
                          />
                        )}
                        <TouchableOpacity
                          key={i}
                          style={{padding: 10}}
                          onPress={() => {
                            this.chooseOption(item, i);
                          }}>
                          {item.state_name ? (
                            <Text style={styles.text}>{item.state_name}</Text>
                          ) : item.model_name ? (
                            <Text style={styles.text}>{item.model_name}</Text>
                          ) : (
                            <Text style={styles.text}>{item.name}</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </Modal>
            )}
            <Modal
              modalDidOpen={() => Keyboard.dismiss()}
              open={this.state.yearModal}
              modalDidClose={() => this.setState({yearModal: false})}>
              <ScrollView>
                {this.state.years
                  .map((item, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{padding: 10}}
                        onPress={() => {
                          this.setState({selectedYear: item, yearModal: false});
                        }}>
                        <Text style={[styles.text, {color: 'gray'}]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                  .reverse()}
              </ScrollView>
            </Modal>
          </>
        </DisableKeyboard>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getStates,
      getMake,
      getModel,
      addVehicle,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddVehicle);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    marginBottom: 20,
    fontFamily,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.white,
    width: '30%',
    borderBottomWidth: 2,
    borderBottomColor: colors.inputFields,
    height: 35,
    fontSize: 15,
    marginVertical: 10,
    paddingVertical: 5,
    fontFamily,
    color: colors.camera,
  },
  colorsContainer: {
    flexDirection: 'column',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colors: {
    width: DEVICE_WIDTH > 500 ? 30 : DEVICE_WIDTH * 0.11,
    height: DEVICE_WIDTH > 500 ? 30 : DEVICE_WIDTH * 0.11,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 7,
    shadowColor: 'black',
    shadowOffset: {x: 1, y: 1},
    shadowOpacity: 0.2,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 2,
    borderBottomColor: colors.schedule,
    paddingBottom: 5,
  },
  btnContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: DEVICE_HEIGHT > 600 ? 55 : 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: DEVICE_HEIGHT > 600 ? 22 : 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily,
  },
  text: {
    fontFamily,
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   StatusBar,
//   Dimensions,
//   Image,
//   CheckBox,
// } from 'react-native';
// import {Header} from 'react-native-elements';
// import colors from '../../assests/styles';
// import {NavigationActions, StackActions} from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Swiper from 'react-native-swiper';
// const height = Dimensions.get('window').height;
// const fontFamily = colors.font;
// import {slider} from '../../assests';

// const NurseDressing = ({navigation, getSubCategories, subCategories}) => {
//   const [isSelected, setSelection] = useState(false);
//   const item = navigation.getParam('item');
//   const [array, setArray] = useState([]);

//   useEffect(() => {
//     console.log('DEBUG nurseDressing: ', item);
//   }, []);

//   var arrayNew = [];
//   var string = '';
//   // const addArray = item => {
//   //   arrayNew = [...array];
//   //   arrayNew.push(item);
//   //   setArray(arrayNew);

//   //   console.log('DEBUG arrayNew: ', arrayNew);
//   //   console.log('DEBUG array: ', array);
//   // };

//   const addArray = item => {
//     if (string !== '') {
//       string = string + ',' + item;
//     } else {
//       string = item;
//     }

//     console.log('DEBUG string: ', string);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
//         <Header
//           backgroundColor={colors.primary}
//           leftComponent={
//             <Ionicons
//               onPress={() => {
//                 navigation.toggleDrawer();
//               }}
//               name="menu"
//               size={27}
//               style={styles.fontsize}
//               // onPress={() => {
//               //   navigation.toggleDrawer();
//               // }}
//             />
//           }
//           centerComponent={<Text style={[styles.texthome]}>Book a Nurse</Text>}
//         />

//         <View style={{height: height / 5.3}}>
//           <Swiper
//             style={styles.wrapper}
//             paginationStyle={{
//               position: 'absolute',
//               top: height / 5.5,
//             }}>
//             <Image style={styles.imagestyle} source={slider} />

//             <Image style={styles.imagestyle} source={slider} />

//             <Image style={styles.imagestyle} source={slider} />
//           </Swiper>
//         </View>

//         <View
//           style={{
//             padding: 20,
//             marginLeft: 10,
//             marginTop: 20,
//           }}>
//           <Text style={styles.textw}>Choose for</Text>
//           <Text style={styles.servicetext}>Dressing</Text>
//         </View>
//         <View style={{padding: 20, marginLeft: 5, marginTop: 20}}>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={isSelected}
//               // onValueChange={setSelection}
//               onValueChange={() => addArray(1)}
//               style={styles.checkbox}
//             />
//             <Text style={styles.label}>Wound Dressing</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={isSelected}
//               // onValueChange={setSelection}
//               onValueChange={() => addArray(2)}
//               style={styles.checkbox}
//             />
//             <Text style={styles.label}>Burn Dressing</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={isSelected}
//               // onValueChange={setSelection}
//               onValueChange={() => addArray(3)}
//               style={styles.checkbox}
//             />
//             <Text style={styles.label}>Oral Dressing</Text>
//           </View>
//           <View style={styles.checkboxContainer}>
//             <CheckBox
//               value={isSelected}
//               // onValueChange={setSelection}
//               onValueChange={() => addArray(4)}
//               style={styles.checkbox}
//             />
//             <Text style={styles.label}>Colostomy Dressing</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default NurseDressing;
// const SIZE = 50;
// const ICON_WRAPPER_SIZE = 45;
// const styles = StyleSheet.create({
//   header: {
//     height: height / 14,
//     backgroundColor: '#1CD5CD',
//     flexDirection: 'row',
//   },
//   servicetext3: {
//     fontSize: 20,
//     marginLeft: 5,
//     color: '#9A98B0',
//   },
//   inputStyle: {
//     backgroundColor: 'white',
//     borderBottomWidth: 1.5,
//     borderTopWidth: 1.5,
//     borderLeftWidth: 1.5,
//     borderRightWidth: 1.5,
//     borderColor: '#E8E8E8',
//     borderRadius: 100,
//   },
//   inputText: {
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 5,
//     marginLeft: 0,
//     padding: 10,
//     marginBottom: 15,
//     color: 'black',
//   },
//   fontsize: {
//     color: 'white',
//   },
//   texthome: {
//     color: 'white',
//     fontSize: 15,
//     fontFamily,
//     top: 4,
//   },
//   mediumText: {
//     fontSize: 10,
//     color: '#000',
//     marginVertical: 2,
//     marginLeft: Platform.OS === 'ios' ? 0 : 2,
//     fontFamily,
//   },

//   imagestyle: {flex: 1, width: '100%'},
//   wrapper: {
//     // backgroundColor: 'black',
//     // height: height / 3.2,
//     resizeMode: 'contain',
//     backgroundColor: 'black',
//   },

//   // text: {
//   //   color: '#fff',
//   //   fontSize: 30,
//   //   fontWeight: 'bold',
//   // },
//   servicetext: {
//     color: '#FFB915',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   textw: {
//     fontSize: 20,

//     color: '#9A98B0',
//   },
//   // servicetext1: {
//   //   color: '#1CD5CD',
//   //   fontWeight: 'bold',
//   //   fontSize: 20,
//   //   // marginLeft: 10,
//   // },
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 14,
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//   },
//   iconStyle: {
//     height: 40,
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderRadius: 50/2,
//     // backgroundColor: 'red',
//   },
//   cardContainer: {
//     // flex: 1,
//     // backgroundColor:'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//     textAlign: 'center',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     padding: 10,
//     height: 80,
//     width: 80,
//     marginLeft: 10,
//     // borderRadius: 2,
//     backgroundColor: '#F9F7F6',

//     borderRadius: 20,
//     elevation: 5,
//     shadowColor: '#BDBDBD',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//   },

//   pinText: {
//     color: 'black',
//     textAlign: 'center',
//     fontSize: 20,

//     alignSelf: 'center',
//   },
//   searchText: {
//     fontSize: 14,
//     color: '#000',
//     marginLeft: 20,
//   },
//   firstRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flex: 1,
//   },
//   secondRow: {
//     paddingHorizontal: 6,
//     alignItems: 'center',
//   },

//   optionContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   optionWrapper: {
//     marginVertical: 10,
//     paddingHorizontal: 16,
//   },
//   optionTitleWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 17,
//     color: '#000',
//     marginLeft: 10,
//   },
//   subtitle: {
//     color: '#eee',
//     fontSize: 12,
//   },
//   // container: {
//   //   flex: 1,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     margin: 5,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

import React, {Component, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Image,
  TextInput,
  Button,
  CheckBox,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import colors from '../../assests/styles';
import {Building} from '../../assests/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {slider, swich} from '../../assests';
const fontFamily = colors.font;
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {getSubCategories} from '../../actions/app';
import Loading from '../../components/Loading';
import {store_url} from '../../config/config';
import moment from 'moment';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const SIZE = 50;
const ICON_WRAPPER_SIZE = 45;
const NurseDressing = ({navigation, getSubCategories, subCategories}) => {
  const from = navigation.getParam('from');
  const item = navigation.getParam('item');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const seetRef = useRef(null);
  const [date, setDate] = useState(
    from === 'edit' ? moment(item.order_date) : new Date(),
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {id, name} = navigation.getParam('item');
  const [loading, setLoading] = useState(true);
  const [des, setDescription] = useState(
    from === 'edit' ? item.description : '',
  );
  const [time, setTime] = useState('');
  const [subId, setSubId] = useState(null);

  const [isSelected, setSelection] = useState(false);
  // const item = navigation.getParam('item');
  const [array, setArray] = useState([]);

  var arrayNew = [];
  var string = '';
  const addArray = item => {
    arrayNew = [...array];
    arrayNew.push(item);
    setArray(arrayNew);

    console.log('DEBUG arrayNew: ', arrayNew);
    console.log('DEBUG array: ', array);
  };

  // const addArray = item => {
  //   if (string !== '') {
  //     string = string + ',' + item;
  //   } else {
  //     string = item;
  //   }

  //   console.log('DEBUG string: ', string);
  // };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') {
      setDate(selectedDate.toString());
    } else {
      setTime(moment(selectedDate).format('LT'));
    }
  };

  useEffect(() => {
    console.log('DEBUG NurseDressing: ', item);
  });

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const renderPages = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: 15,
          justifyContent: 'center',
          // backgroundColor: 'purple',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
            // backgroundColor: 'pink',
          }}>
          <CheckBox
            value={isSelected}
            // onValueChange={setSelection}
            onValueChange={() => addArray(item)}
            style={styles.checkbox}
          />
          <Text style={(styles.mediumText, {fontSize: 16})}>{item.name}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    console.log('Open Modal');
    const from = navigation.getParam('from');
    from === 'edit' && seetRef.current.open();
    setTime(from === 'edit' ? item.time : 'Select Time');
    getSubCateg();
  }, [id]);

  const getSubCateg = async () => {
    try {
      const formData = new FormData();
      formData.append('cat_id', from === 'edit' ? item.cat : id);
      const res = await getSubCategories(formData);

      res &&
        res.data.data.length < 1 &&
        Alert.alert('iHeal', 'No Subcategory Found');

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleDone = () => {
    try {
      if (!des) {
        Alert.alert('iHeal', 'Kindly enter detail');
      } else if (time === 'Select Time') {
        Alert.alert('iHeal', 'Kindly choose time');
      } else {
        seetRef.current.close();

        navigation.navigate('Places', {
          time,
          date,
          des,
          id,
          subId,
          name,
          from,
          item,
        });
      }
    } catch {
      err;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="arrow-back"
              size={27}
              style={styles.fontsize}
              onPress={() => {
                navigation.goBack();
              }}
            />
          }
          centerComponent={<Text style={[styles.texthome]}>iHeal</Text>}
        />

        <View style={{height: height / 5.3}}>
          <Swiper
            style={styles.wrapper}
            paginationStyle={{
              position: 'absolute',
              top: height / 5.5,
            }}>
            <Image style={styles.imagestyle} source={slider} />

            <Image style={styles.imagestyle} source={slider} />

            <Image style={styles.imagestyle} source={slider} />
          </Swiper>
        </View>
        <View style={{height: height / 9, padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.textw}>Choose</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.servicetext}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.optionContainer}>
          {loading ? (
            <Loading visible={loading} />
          ) : (
            <View>
              <FlatList
                numColumns={1}
                data={subCategories}
                renderItem={renderPages}
                keyExtractor={(item, index) => item + index.toString()}
                showsVerticalScrollIndicator={false}
              />
              <View
                style={{
                  marginTop: 40,
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    seetRef.current.open();
                    setSubId(array);
                    console.log('DEBUG Open');
                  }}
                  style={[
                    styles.inputText,

                    {
                      borderColor: colors.primary,
                      padding: 0,
                      backgroundColor: colors.primary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.texthome,
                      {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18,
                        alignSelf: 'center',
                        margin: 15,
                      },
                    ]}>
                    {'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <RBSheet
          ref={seetRef}
          height={540}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: 10,
            },
          }}>
          <ScrollView contentContainerStyle={{flexGrow: 1, margin: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="ios-chevron-back-outline"
                size={20}
                color={colors.primary}
              />
              <Text
                style={{
                  color: colors.primary,
                  fontFamily,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
            </View>
            {/* <Text
              style={[
                styles.texthome,
                {color: 'black', fontWeight: 'bold', fontSize: 18, margin: 20},
              ]}>
              Task Details
            </Text> */}

            <View>
              <Text
                style={{
                  fontFamily,
                  fontSize: 20,
                  padding: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Choose Preferred Date
              </Text>
              <View>
                {/* <TouchableOpacity
                onPress={showDatepicker}
                style={[
                  styles.inputText,
                  {borderColor: colors.primary, padding: 0},
                ]}>
                <Text
                  style={[
                    styles.texthome,
                    {
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 18,
                      margin: 15,
                      alignSelf: 'center',
                    },
                  ]}>
                  {date}
                </Text>
              </TouchableOpacity> */}
                <DatePicker
                  activeOpacity={1}
                  style={[
                    styles.inputText,
                    {
                      padding: 4,
                      width: '100%',
                      borderRadius: 10,
                      borderColor: colors.primary,
                    },
                  ]}
                  date={date}
                  mode="date"
                  placeholder={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  textAlign="right"
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: 'flex-start',
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    dateText: {
                      color: 'gray',
                      fontFamily,
                      fontSize: 16,
                    },

                    placeholderText: {
                      color: 'gray',
                      fontSize: 16,
                      fontFamily,
                    },
                  }}
                  showIcon={false}
                  onDateChange={date => {
                    setDate(date);
                  }}
                />
              </View>
              <Text
                style={{
                  fontFamily,
                  fontSize: 20,
                  padding: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Choose Preferred Time
              </Text>
              <DatePicker
                activeOpacity={1}
                style={[
                  styles.inputText,
                  {
                    padding: 4,
                    width: '100%',
                    borderRadius: 10,
                    borderColor: colors.primary,
                  },
                ]}
                time={time}
                mode="time"
                placeholder={time ? time : 'Select Time'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                textAlign="right"
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  dateText: {
                    color: 'black',
                    fontSize: 16,
                    fontFamily,
                  },

                  placeholderText: {
                    color: 'gray',
                    fontSize: 16,
                    fontFamily,
                  },
                }}
                showIcon={false}
                onDateChange={time => {
                  setTime(time);
                }}
              />
              <Text
                style={{
                  fontFamily,
                  fontSize: 20,
                  padding: 10,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Any Specific Notes
              </Text>
              <TextInput
                value={des}
                style={[
                  styles.inputText,
                  {
                    borderColor: 'transparent',
                    borderBottomColor: colors.primary,
                    alignSelf: 'center',
                    width: '100%',
                  },
                ]}
                placeholder={'please specify the task'}
                onChangeText={text => setDescription(text)}
              />
            </View>

            <View
              style={{
                marginTop: 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleDone();
                  setSubId(array);
                }}
                style={[
                  styles.inputText,

                  {
                    borderColor: colors.primary,
                    padding: 0,
                    backgroundColor: colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.texthome,
                    {
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 18,
                      alignSelf: 'center',
                      margin: 15,
                    },
                  ]}>
                  {from === 'edit' ? 'Update  inspection' : 'Book for ₹500'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const {subCategories} = state.appReducer;
  return {subCategories};
};
export default connect(
  mapStateToProps,
  {getSubCategories},
)(NurseDressing);
const styles = StyleSheet.create({
  header: {
    height: height / 14,
    backgroundColor: '#1CD5CD',
    flexDirection: 'row',
  },

  inputStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    marginLeft: 0,
    padding: 10,
    marginBottom: 15,
    color: 'black',
  },
  fontsize: {
    color: 'white',
  },
  texthome: {
    color: 'white',

    fontSize: 15,

    fontFamily,
  },

  imagestyle: {flex: 1, width: '100%'},
  wrapper: {
    // backgroundColor: 'black',
    // height: height / 3.2,

    backgroundColor: 'black',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  servicetext: {
    color: '#EFCA75',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: -5,
  },
  textw: {
    fontSize: 20,
    color: '#9A98B0',
  },
  servicetext1: {
    color: '#5ACBC2',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  cardContainer: {
    // flex: 1,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 10,
    height: 80,
    width: 80,
    marginLeft: 10,
    // borderRadius: 2,
    backgroundColor: '#F9F7F6',

    borderRadius: 20,
    elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  mediumText: {
    fontSize: 13,
    color: '#000',
    marginVertical: 10,
    marginLeft: Platform.OS === 'ios' ? 0 : 2,
    fontFamily,
  },
  pinText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,

    alignSelf: 'center',
  },
  searchText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 20,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  secondRow: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  profileImg: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  profileName: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 0.6,
    margin: 10,
  },
  cameraWrapper: {
    backgroundColor: colors.primary,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    position: 'absolute',
    bottom: -20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    borderRadius: ICON_WRAPPER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  optionContainer: {
    flex: 1,
  },
  optionWrapper: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  optionTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
  },
  subtitle: {
    color: '#eee',
    fontSize: 12,
  },
});

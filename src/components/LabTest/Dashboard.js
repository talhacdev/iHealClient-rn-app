import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../../assests/styles';
import {Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
const height = Dimensions.get('window').height;
const fontFamily = colors.font;
import {slider, Home1, User1} from '../../assests';
import Swiper from 'react-native-swiper';

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Header
          backgroundColor={colors.primary}
          leftComponent={
            <Ionicons
              name="menu"
              size={27}
              style={styles.fontsize}
              // onPress={() => {
              //   navigation.toggleDrawer();
              // }}
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

        <View
          style={{
            padding: 20,
            marginLeft: 10,
            marginTop: 20,
          }}>
          <Text style={styles.textw}>Heading</Text>
          <Text style={{paddingTop: 20, color: '#9A98B0'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            height: 150,
            width: 150,
            backgroundColor: '#F9F7F6',
            justifyContent: 'center',
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: '#BDBDBD',
            elevation: 1,
            shadowOffset: {
              width: 0,
              height: 1,
            },
          }}>
          <Image source={User1} />
          <Text
            style={{
              fontSize: 16,
              paddingTop: 10,

              color: '#9A98B0',
              fontWeight: 'bold',
            }}>
            Book a nurse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 150,
            width: 150,
            backgroundColor: '#F9F7F6',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#BDBDBD',
            elevation: 1,
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 1,
            },
          }}>
          <Image source={Home1} />
          <Text
            style={{
              fontSize: 16,
              paddingTop: 10,
              color: '#9A98B0',
              fontWeight: 'bold',
            }}>
            Home Lab Tests
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
const SIZE = 50;
const ICON_WRAPPER_SIZE = 45;

const styles = StyleSheet.create({
  header: {
    height: height / 14,
    backgroundColor: '#1CD5CD',
    flexDirection: 'row',
  },
  servicetext3: {
    fontSize: 20,
    marginLeft: 5,
    color: '#9A98B0',
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
    top: 4,
  },
  mediumText: {
    fontSize: 10,
    color: '#000',
    marginVertical: 2,
    marginLeft: Platform.OS === 'ios' ? 0 : 2,
    fontFamily,
  },

  imagestyle: {flex: 1, width: '100%'},
  wrapper: {
    // backgroundColor: 'black',
    // height: height / 3.2,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },

  // text: {
  //   color: '#fff',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  // },
  servicetext: {
    color: '#FFB915',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textw: {
    fontSize: 20,

    color: '#9A98B0',
    fontWeight: 'bold',
  },
  // servicetext1: {
  //   color: '#1CD5CD',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   // marginLeft: 10,
  // },
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
  iconStyle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 50/2,
    // backgroundColor: 'red',
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

  optionContainer: {
    flex: 1,
    alignItems: 'center',
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
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 5,
    fontSize: 16,
    color: 'gray',
  },
  cardContainer: {
    // flex: 1,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
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
});

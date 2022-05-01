import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import colors from '../../assests/styles';
const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

import visa from '../../assests/visa.png';
import mastercard from '../../assests/master_card.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {cart, updatePaymentStatus, getCard} from '../../actions/orders';

import Loader from '../general/Loader';
import AsyncStorage from '@react-native-community/async-storage';

class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCard: false,
      payByCash: true,
      loader: true,
    };
  }

  componentDidMount() {
    this.willFocus = this.props.navigation.addListener('willFocus', () => {
      this.getCardFun();
    });
    this.getCardFun();
  }
  getCardFun = () => {
    const {getCard, user} = this.props;
    const data = new FormData();
    data.append('phone_no', user.phone_no);
    data.append('session_key', user.session);
    new Promise((rsl, rej) => {
      getCard(data, rsl, rej);
    }).then(res => {
      this.setState({loader: false});
    });
  };

  handler = async status => {
    const {user, updatePaymentStatus, navigation} = this.props;
    const orderId = await AsyncStorage.getItem('orderId');
    if (orderId) {
      this.setState({loader: true});
      const data = new FormData();
      data.append('phone_no', user.phone_no);
      data.append('session_key', user.session);
      data.append('order_id', orderId);
      data.append('status', status);
      new Promise((rsl, rej) => {
        updatePaymentStatus(data, rsl, rej);
      })
        .then(async res => {
          await AsyncStorage.removeItem('orderId');
          this.setState({loader: false});
          navigation.dispatch({
            type: 'CustomNav',
            routeName: 'Confirmed',
            key: 'Confirmed',
          });
        })
        .catch(err => {
          this.setState({loader: false});
          Alert.alert('Sorry!', err);
        });
    } else {
      Alert.alert('Oops!', 'Something not good try again in a few minutes', [
        {
          text: 'Go Back',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  render() {
    const {cards} = this.props;
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always">
          {/* <View style={{ paddingLeft: 20 }} >
                        <Text style={styles.headerText} >Pay Now</Text>
                    </View> */}
          {/* <View style={styles.cardContainer}  >
                        <TouchableOpacity style={styles.cardHeader}
                            // onPress={() => {
                            //     cards !== undefined && this.setState({ toggleCard: !this.state.toggleCard })
                            // }}
                        >
                            <View>
                                <Text style={styles.headerText} >Pay By Credit/Debit Card</Text>
                                <Text style={[styles.headerText, { fontSize: 12 }]} >Now</Text>
                            </View>
                            <Icon name="angle-down" style={styles.headerText} />
                        </TouchableOpacity>
                        {this.state.toggleCard &&
                            <View>
                                {cards.map((item, i) => {
                                    let cardno = item.cardno.slice(15, 19)
                                    return (
                                        <TouchableOpacity key={i} style={styles.cards} >
                                            <Text style={styles.headerText} >****-****-****-{cardno}</Text>
                                            <Image source={item.cardtype == 'visa' ? visa : mastercard} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        }
                    </View> */}
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              {
                backgroundColor: this.state.payByCash
                  ? colors.secondary
                  : colors.primary,
              },
            ]}
            // onPress={() => this.handler('3')}
            onPress={() => Alert.alert('iHeal', 'This feature is coming soon')}>
            <Text
              style={[
                styles.headerText,
                {color: this.state.payByCash ? colors.camera : colors.white},
              ]}>
              Pay By Credit/ Debit Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              {
                backgroundColor: this.state.payByCash
                  ? colors.primary
                  : colors.secondary,
              },
            ]}
            // onPress={() => this.handler('1')}
          >
            <Text
              style={[
                styles.headerText,
                {color: this.state.payByCash ? colors.white : colors.camera},
              ]}>
              Pay At My Location
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.state.loader && <Loader />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    cartData: state.ordersReducer.cartData,
    cards: state.ordersReducer.cards,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      cart,
      updatePaymentStatus,
      getCard,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentMethods);

const fontFamily = colors.font;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: DEVICE_HEIGHT > 600 ? 18 : 14,
    color: colors.camera,
    fontFamily,
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    paddingBottom: 1,
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 20,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  paymentMethod: {
    padding: 20,
    marginTop: 10,
  },
});

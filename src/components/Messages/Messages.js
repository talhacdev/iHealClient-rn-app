import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Linking,
} from 'react-native';
import {fontSizes} from './fontSizes';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Icon, MaterialIcon} from './index';
import {chatDetails} from './data';
import {MoneyChat, GalleryChat} from './ChatType';
import posed, {Transition} from 'react-native-pose';
import {moderateScale} from './scalingUnit';
import colors from '../../assests/styles';
const fontFamily = colors.font;
import {Header} from 'react-native-elements';
// import io from 'socket.io-client/dist/socket.io';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {sendMessage, append, newMessages} from '../../actions/app';
import {Alert} from 'react-native';
const attachmentIcons = [
  {
    id: 1,
    name: 'Document',
    iconName: 'document',
    colorCode: colors.documentIcon,
  },
  {
    id: 2,
    name: 'Payment',
    iconName: 'rupee',
    colorCode: colors.paymentIcon,
  },
  {
    id: 3,
    name: 'Gallery',
    iconName: 'gallery',
    colorCode: colors.galleryIcon,
  },
  {
    id: 4,
    name: 'Audio',
    iconName: 'music',
    colorCode: colors.musicIcon,
  },
  {
    id: 5,
    name: 'Location',
    iconName: 'location',
    colorCode: colors.locationIcon,
  },
  {
    id: 6,
    name: 'Profile',
    iconName: 'profile',
    colorCode: colors.profileIcon,
  },
];

const config = {
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    staggerChildren: 60,
    delayChildren: 100,
  },
  exit: {
    opacity: 0,
    y: 200,
    scale: 0,
    delay: 100,
  },
};

const attachmentIconConfig = {
  enter: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const AttachmentView = posed.View(config);
const AttachmentIcon = posed.View(attachmentIconConfig);

const Messages = props => {
  const chatId = 10;
  // const [sockt, setSocket] = useState(null);
  // const [socketId, setId] = useState('');
  const [id, setID] = useState(props.navigation.getParam('id'));
  const [uri, setUri] = useState(props.navigation.getParam('uri'));
  const [username, setUsername] = useState(
    props.navigation.getParam('userName'),
  );
  const [status, setStatus] = useState(props.navigation.getParam('isOnline'));

  const [typeMessage, setMessage] = useState('');
  const [isAttachmentContentShow, setAttachmentContentShow] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardShow, setKeyboardShow] = useState(false);
  const job = props.navigation.getParam('job');

  const chatType = (isSend, text, type = 'TEXT', uri = '') => {
    console.log(isSend);
    return (
      <Text style={isSend === 'SEND' ? styles.sentText : styles.receivedText}>
        {text}
      </Text>
    );
  };

  // useEffect(() => {
  //   connectSocket();
  // }, []);
  // const connectSocket = async () => {
  //   let socket = io.connect('http://ranaentp.net:3000/', {
  //     autoConnect: true,
  //     query: {
  //       device: 'android',
  //       role: 'zaid',
  //       u_id: props.user.u_id,
  //     },
  //     transports: ['websocket'],
  //   });
  //   setSocket(socket);
  // };
  const onAttachmentIcon = () => {
    Keyboard.dismiss();
    setAttachmentContentShow(!isAttachmentContentShow);
  };
  const onSend = () => {
    const formData = new FormData();
    formData.append('content', typeMessage);
    formData.append('recver_id', job?.assigned_to);
    formData.append('u_id', props.user.u_id);
    console.log(formData);

    new Promise((rsl, rej) => {
      props.sendMessage(formData, props.messages, rsl, rej);
    })
      .then(res => {
        // appendMessage(res);
        setMessage('');
        console.log(res);
      })
      .catch(err => {
        setMessage('');

        console.log(err);
      });
    // let message = messages;
    // const msg = {
    //   id: Math.random(),
    //   text: typeMessage,
    //   type: 'SEND',
    //   time: '5:36 pm',
    //   messageType: 'TEXT',
    //   u_id: '704',
    // };
    // setMessages([...message, msg]);
    // sockt.emit('send_message', msg);
    // setMessage('');
    // sockt.on('message_response', (data) => {
    //   setMessages([...messages, data.data]);
    // });
    // console.log(messages);
  };
  const getNewMsgs = () => {
    // newMessages;
    let lastMsg = props?.messages[props?.messages?.length - 1];
    const formData = new FormData();
    formData.append('msg_id', lastMsg?.msg_id);
    formData.append('recv_id', job?.assigned_to);
    formData.append('u_id', props.user.u_id);
    console.log(formData);

    new Promise((rsl, rej) => {
      props.newMessages(formData, props.messages, rsl, rej);
    })
      .then(res => {
        // appendMessage(res);
        setMessage('');
        console.log(res);
      })
      .catch(err => {
        setMessage('');

        console.log(err);
      });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      props.messages && getNewMsgs();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    let keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    let keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide', //keyboardWillHide
      keyboardDidHide,
    );

    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  });

  // useEffect(() => {
  //   const chatDetail = chatDetails.filter(chat => {
  //     return chat.id === chatId;
  //   });
  //   chatDetail && setMessages(chatDetail[0].messages);
  // }, []);

  keyboardDidShow = event => {
    setAttachmentContentShow(false);
    setKeyboardShow(true);
    setKeyboardHeight(event.endCoordinates.screenY);
  };

  keyboardDidHide = event => {
    setKeyboardShow(false);
  };

  const onCamera = () => {
    props.navigation.navigate('CameraScreen', {
      uri,
    });
  };

  const onProfile = () => {
    props.navigation.navigate('ContactProfileScreen', {
      id,
      uri,
      username,
      status,
    });
  };

  onCall = () => {
    props.navigation.navigate('Calling', {
      uri,
      name: username,
    });
  };

  return (
    <View
      style={{flex: 1}}
      onStartShouldSetResponder={() => setAttachmentContentShow(false)}>
      <StatusBar
        animation={true}
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <Header
        leftComponent={
          <AntDesign
            name={'arrowleft'}
            size={20}
            style={{marginTop: 10}}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        }
        backgroundColor={'transparent'}
        containerStyle={{padding: 10}}
        centerComponent={
          <Text style={[styles.timeText, {fontSize: 20, marginTop: 10}]}>
            Messages
          </Text>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              job?.phone_no
                ? Linking.openURL(`tel:${job?.phone_no}`)
                : Alert.alert('iHeal', 'Phone Not not found');
            }}
            style={[
              styles.iconWrapper,
              {height: 30, width: 30, marginTop: 10},
            ]}>
            <MaterialIcons name="call" size={20} color={colors.white} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.inverted}
        contentContainerStyle={styles.content}>
        {props.messages &&
          props.messages
            .map(chats => {
              const isSend =
                chats.send_id === props.user.u_id ? 'SEND' : 'RECEIVE';

              return (
                <View
                  key={chats.id}
                  style={[
                    isSend === 'SEND'
                      ? styles.sentContainer
                      : styles.receivedContainer,
                    styles.inverted,
                  ]}>
                  <View style={{paddingVertical: 4, paddingHorizontal: 6}}>
                    <View
                      style={[
                        [styles.bubble],
                        isSend === 'SEND'
                          ? [styles.sent, styles.sendBorderRadiusStyle]
                          : [styles.received, styles.receivedBorderRadiusStyle],
                      ]}>
                      {chatType(isSend, chats.content, chats.uri)}
                    </View>
                    <View
                      style={[
                        styles.timeContainer,
                        isSend === 'SEND' && {justifyContent: 'flex-end'},
                      ]}>
                      <Text style={styles.timeText}>{chats.time}</Text>
                    </View>
                  </View>
                </View>
              );
            })
            .reverse()}
      </ScrollView>

      <Transition>
        {isAttachmentContentShow && (
          <AttachmentView
            key="attach"
            style={[
              styles.attachmentContentWrapper,
              isKeyboardShow && {
                transform: [{translateY: keyboardHeight}],
                zIndex: 99999,
              },
            ]}>
            {attachmentIcons.map(item => (
              <AttachmentIcon key={item.id} style={styles.iconContainer}>
                <View
                  style={[styles.iconWrapper, {borderColor: item.colorCode}]}>
                  <Icon
                    name={item.iconName}
                    color={item.colorCode}
                    size={moderateScale(22)}
                  />
                </View>
                <Text style={styles.iconText}>{item.name}</Text>
              </AttachmentIcon>
            ))}
          </AttachmentView>
        )}
      </Transition>

      <View style={styles.writeMessageContainer}>
        <View style={styles.firstCol}>
          <TextInput
            style={styles.input}
            placeholder="Type your message"
            underlineColorAndroid="transparent"
            multiline={true}
            onFocus={() =>
              isAttachmentContentShow && setAttachmentContentShow(false)
            }
            onChangeText={text => {
              setMessage(text);
            }}
            value={typeMessage}
          />
        </View>

        <View style={styles.secondCol}>
          <TouchableOpacity style={styles.iconWrapper} onPress={onSend}>
            <MaterialIcons
              iconStyle={{marginLeft: 6}}
              name="send"
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>
          {/* <MaterialIcon
            onPress={onAttachmentIcon}
            style={styles.iconContentContainer}
            name="attachment"
            iconStyle={styles.attachIcon}
            size={24}
            color={colors.darkGrey}
          />
          <MaterialIcon
            onPress={onCamera}
            style={styles.iconContentContainer}
            name="camera"
            size={24}
            color={colors.darkGrey}
          /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  userDetail: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingRight: 8,
    paddingVertical: 2,
  },
  searchText: {
    // fontSize: fontSizes.medium,
    color: colors.black,
    // fontFamily: fonts.Medium,
    marginLeft: 12,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '60%',
  },
  secondRow: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  userWrapperStyle: {
    bottom: -2,
    left: 14,
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
  },
  userContainerStyle: {
    width: 6,
    height: 6,
    borderRadius: 6 / 2,
  },
  inverted: {
    transform: [{scaleY: -1}],
  },
  content: {
    padding: 10,
  },
  receivedContainer: {
    flexDirection: 'row',
  },
  sentContainer: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sent: {
    backgroundColor: colors.primary,
  },
  received: {
    backgroundColor: colors.lightGrey,
  },
  sentText: {
    color: colors.white,
    fontFamily,
    // fontSize: fontSizes.small,
    // fontFamily: fonts.Regular,
  },
  receivedText: {
    color: 'black',
    fontFamily,
    // fontSize: fontSizes.small,
    // fontFamily: fonts.Regular,
  },
  sendBorderRadiusStyle: {
    borderTopStartRadius: 6,
    borderTopRightRadius: 6,
    borderBottomEndRadius: 6,
  },
  receivedBorderRadiusStyle: {
    borderTopStartRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomStartRadius: 6,
  },
  input: {
    flex: 1,
    height: 50,
    paddingVertical: 10,
    marginLeft: 10,
    paddingRight: 5,
    // fontSize: fontSizes.medium,
  },
  writeMessageContainer: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderTopWidth: 0.8,
    borderTopColor: '#E7E7E7',
  },
  firstCol: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '85%',
  },
  secondCol: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150%',
    paddingHorizontal: 10,
  },
  timeContainer: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    flexDirection: 'row',
  },
  timeText: {
    // fontSize: fontSizes.tinySmall,
    // fontFamily: fonts.Regular,
    color: colors.darkGrey,
    fontFamily,
  },
  checkMarkIcon: {
    marginLeft: 4,
    alignSelf: 'flex-start',
    padding: 0,
  },
  attachIcon: {
    transform: [{rotate: '315deg'}],
  },
  sendIconWrapper: {
    padding: 1,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  attachmentContentWrapper: {
    position: 'absolute',
    bottom: 56,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: colors.white,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 0.8,
    borderColor: '#E7E7E7',
    borderRadius: 10,
  },
  iconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(55) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  iconText: {
    fontSize: 12,
    color: colors.black,
    marginTop: 10,
    // fontFamily: fonts.Regular,
  },
  iconContentContainer: {
    padding: 6,
  },
  icon: {
    marginHorizontal: 4,
  },
});

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    messages: state.appReducer.messages,
  };
};

export default connect(
  mapStateToProps,
  {sendMessage, append, newMessages},
)(Messages);

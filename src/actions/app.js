import axios from 'axios';
import {store_url} from '../config/config';

import {
  GET_CATEGORIES,
  GET_SUB_CATEG,
  POP_UP_DATE,
  NEARBYDRIVERS,
  NEARBYDRIVER,
} from './types';

//get categs
export const getCategories = data => {
  console.log(data);
  return async dispatch => {
    try {
      const res = await axios.post(`${store_url}Authentication/category`, data);
      // return res;
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: GET_CATEGORIES,
          categ: res.data.data,
        });
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

//get subcategs
export const getSubCategories = data => {
  console.log(data);
  return async dispatch => {
    try {
      const res = await axios.post(`${store_url}Authentication/category`, data);
      // return res;
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: GET_SUB_CATEG,
          subCateg: res.data.data,
        });
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};
//get subcategs
// export const placeOrder = (data, phone, session) => {
//   console.log('DEBUG placeOrder args: ', data, phone, session);
//   return async dispatch => {
//     try {
//       const res = await axios.post(
//         `${store_url}Authentication/place_order`,
//         data,
//         {
//           headers: {
//             Auth: session,
//             Auth2: phone,
//           },
//         },
//       );
//       return res;
//     } catch (err) {
//       console.log(err);
//       alert(err.message);
//     }
//   };
// };

export const placeOrder = (data, phone, session) => {
  console.log('DEBUG placeOrder args: ', data, phone, session);
  return async dispatch => {
    try {
      const res = await axios.post(
        `${store_url}Authentication/place_order`,
        data,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );
      console.log('DEBUG placeOrder RESPONSE: ', res);
      return res;
    } catch (err) {
      console.log('DEBUG placeOrder RESPONSE: ', res);
      console.log(err);
      alert(err.message);
    }
  };
};

//get subcategs
export const showPopup = (phone, session) => {
  console.log(phone, session);
  return async dispatch => {
    try {
      const res = await axios.post(
        `${store_url}Authentication/show_popup`,
        null,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );
      console.log(res);
      if (res.data.status) {
        dispatch({
          type: POP_UP_DATE,
          popData: res.data.data,
        });
        return res;
      } else {
        dispatch({
          type: POP_UP_DATE,
          popData: res.data.data,
        });
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

export const getDrivers = (session, phone) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `${store_url}Authentication/getalluser`,
        null,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );

      if (res.data.status) {
        let final =
          res.data.data &&
          res.data.data.map(item => {
            return {
              ...item,
              coordinates: {
                latitude: parseFloat(item.lati),
                longitude: parseFloat(item.longi),
              },
            };
          });
        console.log('final', final);
        dispatch({
          type: NEARBYDRIVER,
          drivers: res,
        });
        return final;
      } else {
        dispatch({
          type: NEARBYDRIVER,
        });
        return final;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};

export const giverating = (data, phone, session) => {
  console.log(data, phone, session);
  return async dispatch => {
    try {
      const res = await axios.post(
        `${store_url}Authentication/give_rating`,
        data,
        {
          headers: {
            Auth: session,
            Auth2: phone,
          },
        },
      );

      if (res.data.status) {
        return res;
      } else {
        return res;
      }
    } catch (err) {
      console.log(err);

      alert(err.message);
    }
  };
};
export const sendMessage = (data, messages, rsl, rej) => {
  return dispatch => {
    try {
      axios
        .post(`${store_url}Authentication/SendMsg`, data, {
          // headers: {
          //   Auth: user && user.session,
          //   Auth2: user && user.phone_no,
          // },
        })

        .then(res => {
          dispatch({
            type: 'MESSAGES',
            message: [...messages, res.data.data],
          });
          rsl(res);
        })
        .catch(err => {
          rej(err.message);
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};
export const newMessages = (data, messages, rsl, rej) => {
  return dispatch => {
    try {
      axios
        .post(`${store_url}Authentication/get_new_msgs`, data, {})

        .then(res => {
          console.log(res.data.data);
          let newMsgs = messages?.concat(res.data.data);
          res.data.data !== '' &&
            dispatch({
              type: 'MESSAGES',
              message: newMsgs?.sort(
                (a, b) => parseInt(a.msg_id) - parseInt(b.msg_id),
              ),
            });
          rsl(res);
        })
        .catch(err => {
          dispatch({
            type: 'MESSAGES',
            message: [],
          });
          rej(err.message);
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};
export const getuserRatingBalance = (data, rsl, rej) => {
  return dispatch => {
    try {
      axios
        .post(`${store_url}Authentication/get_rating_blnc`, data, {})

        .then(res => {
          console.log(res.data.data.blnc);

          dispatch({
            type: 'USER_BAL_RAT',
            balance: res.data.data.blnc,
            totalrating: res.data.data.totalrating,
          });
          rsl(res);
        })
        .catch(err => {
          console.log(err);

          rej(err.message);
        });
    } catch (err) {
      console.log(err);
      rej(err.message);
    }
  };
};

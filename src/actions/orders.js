import {store_url} from '../config/config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const getOrders = (data, rsl, rej) => {
  return dispatch => {
    const res = axios(`${store_url}/Authentication/get_my_order`, {
      method: 'post',
      data,
    })
      .then(res => {
        console.log('orders', res);
        if (res.data.status == true && res.data.data.length > 0) {
          dispatch({
            type: 'GET_ORDERS',
            orders: res.data.data,
          });
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (
          res.data.status == false &&
          res.data.message == 'No orders'
        ) {
          dispatch({
            type: 'GET_ORDERS',
          });
          rsl();
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};
export const getCompletedOrders = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/get_my_completed_order`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.length > 0) {
          dispatch({
            type: 'GET_COMPLETED_ORDERS',
            completedOrders: res.data.data,
          });
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (
          res.data.status == false &&
          res.data.message == 'No orders'
        ) {
          dispatch({
            type: 'GET_COMPLETED_ORDERS',
          });
          rsl();
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};

export const getRangeTypes = (phone, session, rsl, rej) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    formData.append('session_key', session);

    axios(`${store_url}/Authentication/get_types`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.length > 0) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};

export const getBrands = (phone, session, type, date, rsl, rej) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    formData.append('session_key', session);
    formData.append('type', type);
    formData.append('date', date);

    axios(`${store_url}/Authentication/get_brand`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.length > 0) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};

export const getTimeSlots = (phone, session, date, rsl, rej) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('date', date);
    formData.append('session_key', session);
    formData.append('phone_no', phone);

    axios(`${store_url}/Authentication/get_timeslot`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.length > 0) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};

export const cart = data => {
  return dispatch => {
    dispatch({
      type: 'CART',
      cartData: data,
    });
  };
};

export const getFilter = (phone, session, model, date, rsl, rej) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('phone_no', phone);
    formData.append('session_key', session);
    formData.append('model_id', model);
    formData.append('date', date);

    axios(`${store_url}/Authentication/get_additional_items_price`, {
      method: 'post',
      data: formData,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl(res.data.data);
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};

export const insertOrder = (data, phone, sesion, rsl, rej) => {
  return console.log(data, phone, sesion);
  return dispatch => {
    axios(`${store_url}/Authentication/place_order`, {
      method: 'post',
      data,
      headers: {
        Auth: sesion,
        Auth2: phone,
      },
    })
      .then(async res => {
        console.log(JSON.stringify(res));
        // if (res.data.status == true) {
        //   await AsyncStorage.setItem('orderId', JSON.stringify(res.data.data));
        //   rsl();
        // } else if (
        //   res.data.status == false &&
        //   res.data.message == 'Invalid Session or Mobile no.'
        // ) {
        //   dispatch({
        //     type: 'SESSION',
        //     sessionExpired: true,
        //   });
        // } else if (res.data.status == false) {
        //   rej(res.data.message);
        // }
      })
      .catch(err => rej(err.message));
  };
};

export const updatePaymentStatus = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/update_order_payment_status`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};
export const deleteOrder = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/delete_order`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};
export const editOrder = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/edit_order`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.order_id !== undefined) {
          dispatch({
            type: 'EDIT_ORDER',
            edit_order: res.data.data,
          });
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};
export const updateOrder = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/place_order`, {
      method: 'post',
      data,
    })
      .then(async res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => rej(err.message));
  };
};
export const getCard = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/getcard`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true && res.data.data.length > 0) {
          dispatch({
            type: 'GET_CARDS',
            cards: res.data.data,
          });
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rsl();
        } else {
          rsl();
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};
export const addCard = (data, rsl, rej) => {
  return dispatch => {
    axios(`${store_url}/Authentication/uploadcard`, {
      method: 'post',
      data,
    })
      .then(res => {
        if (res.data.status == true) {
          rsl();
        } else if (
          res.data.status == false &&
          res.data.message == 'Invalid Session or Mobile no.'
        ) {
          dispatch({
            type: 'SESSION',
            sessionExpired: true,
          });
        } else if (res.data.status == false) {
          rej(res.data.message);
        }
      })
      .catch(err => {
        rej(err.message);
      });
  };
};
export const removeEditOrder = () => {
  return dispatch => {
    dispatch({
      type: 'EDIT_ORDER',
    });
  };
};

import { store_url } from '../config/config';
import axios from 'axios';

export const getLocations = (phone, session, rsl, rej) => {
    return dispatch => {

        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)

        axios(`${store_url}/Authentication/get_all_locations`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {

                if (res.data.status == true && res.data.data.length > 0) {
                    dispatch({
                        type: 'GET_LOCATIONS',
                        locations: res.data.data,
                    })
                    rsl();
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false && res.data.message == "No Data found.") {
                    dispatch({
                        type: 'GET_LOCATIONS',
                    })
                    rej(res.data.message);
                }
            })
            .catch(err => rej(err.message))
    }
}

export const addLocation = (data, rsl, rej) => {
    return dispatch => {
        axios(`${store_url}/Authentication/insert_location`, {
            method: 'post',
            data,
        })
            .then((res) => {

                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false) {
                    rej(res.data.message)
                }
            })
            .catch(err => rej(err.message))
    }
}

export const editLocation = (data, rsl, rej) => {
    return dispatch => {
        axios(`${store_url}/Authentication/update_location`, {
            method: 'post',
            data,
        })
            .then((res) => {

                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else if (res.data.status == false) {
                    rej(res.data.message)
                }
            })
            .catch(err => rej(err.message))
    }
}

export const delLocation = (phone, session, location_id, rsl, rej) => {
    return dispatch => {

        const formData = new FormData();
        formData.append("phone_no", phone)
        formData.append("session_key", session)
        formData.append("location_id", location_id)

        axios(`${store_url}/Authentication/delete_location`, {
            method: 'post',
            data: formData,
        })
            .then((res) => {
                if (res.data.status == true) {
                    rsl(res.data.message)
                }
                else if (res.data.status == false && res.data.message == 'Invalid Session or Mobile no.') {
                    dispatch({
                        type: 'SESSION',
                        sessionExpired: true
                    })
                }
                else {
                    rej(res.data.message)
                }
            })
            .catch(err => rej(err.message))
    }
}
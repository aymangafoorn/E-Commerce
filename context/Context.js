import React from 'react'
import createContext from './createContext'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const base_url = 'http://dev.letsummit.com:49339/'
const Reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        success: action.payload
      }
    case 'orders':
      return {
        ...state,
        orders: action.payload
      }
    case 'items':
      return {
        ...state,
        products: action.payload
      }
    default: return state;
  }
}
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('userdata', jsonValue)
  } catch (e) {
    // saving error
  }
}
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userdata')
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    // error reading value
  }
}
const getItem = dispatch => () => {
  axios.get(base_url + `jsonapi/commerce_product_variation/default?include=product_id`)
    .then((res) => {
      // console.log('res',res.data)
      dispatch({ type: 'items', payload: res.data })
    })
    .catch(e=>{
      console.log('errorget',e)
    })
}
const getOrder = dispatch => (success) => {
  let data = {
    "type": "commerce_order--one_time",
    "id": "29de3be8-a303-40e2-b4cb-a7f62e8d632a",
    "relationships": {
      "coupons": {
        "data": [
          {
            "type": "commerce_promotion_coupon--commerce_promotion_coupon",
            "id": "bfd84eeb-f94a-4497-b61f-fe71c36bb457",
            "attributes": {
              "uuid": "bfd84eeb-f94a-4497-b61f-fe71c36bb457"
            }
          }
        ]
      }
    }
  }
  var settings = {
    "url": base_url + "jsonapi/commerce_order/default",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + success,
      "Content-Type": "application/json"
    },
    "data": data,
  }
  axios(settings)
    .then((response) => {
      dispatch({ type: 'orders', payload: response.data })
    })
}
const login = dispatch => async (email, password) => {
  console.log('data', email, password)
  let data = new FormData()
  data.append('grant_type', 'password')
  data.append('client_id', '6a9326b9-6ba9-4a4d-933b-1e29d417c06c')
  data.append('client_secret', 'consumer123')
  data.append('username', email)
  data.append('password', password)
  var settings = {
    "url": "http://dev.letsummit.com:49339/oauth/token",
    "method": "POST",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false,
    "data": data
  };
  axios(settings)
    .then(res => {
      dispatch({ type: 'login', payload: 'success' });
      storeData(res.data.access_token)
    })
    .catch(error => {
      console.log('error', error)
      dispatch({ type: 'login', payload: 'error' });
    })
}

export const { Provider, Context } = createContext(
  Reducer,
  { login, storeData, getData, getOrder ,getItem},
  {
    loadingstate: false
  }
);
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import image from '../components/images/cartitem.png'
import {
  View,
  Text,
  ScrollView,
  Image
} from 'react-native'
import {
  Input,
  Button,
} from 'react-native-elements';
import { styles } from '../components/styles/styles'

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartdata')
      setCart(JSON.parse(jsonValue))
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      console.log('error', e)
    }
  }
  const empty = () => {
    AsyncStorage.removeItem('cartdata')
  }
  console.log("cart",typeof cart)
  useEffect(() => {
    getData()
  }, [])
  return (
    <ScrollView style={styles.sectionContainer}>
      <Button type='outline' title='Empty Cart' onPress={() => empty()}></Button>
      {cart ? cart.map(data => {
        return (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{data.attributes.title}</Text>
            <Text style={styles.sectionDescription}>{data.attributes ? data.attributes.price ? data.attributes.price.formatted : '' : ''}</Text>
          </View>
        )
      }) : <Text></Text>}
      <Button type='outline' title='Checkout' onPress={() => navigation.navigate('Checkout')}></Button>
    </ScrollView>
  )
}
export default Cart;
import React, { useContext, useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    FlatList,
    ScrollView
} from 'react-native';
import { styles } from '../components/styles/styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import image from '../components/images/cartitem.png'
import {
    Input,
    Button,
    SearchBar
} from 'react-native-elements';
import { Context as UserContext } from '../context/Context'

const Home = ({ navigation }) => {
    const { state, getOrder, getItem } = useContext(UserContext)
    const [search, setSearch] = useState('')
    const [auths, setAuth] = useState('')
    const [item, setItem] = useState([])
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('userdata')
            setAuth(JSON.parse(jsonValue))
            return jsonValue != null ? jsonValue : null;
        } catch (e) {
            console.log('error', e)
        }
    }

    useEffect(() => {
        getData()
        console.log('auths', auths)
        getItem()
        console.log('products', state.products)
        if (auths)
            getOrder(auths)

    }, []);
    const setCarts = async (data) => {
        let cartItem = []
        try {
            let cartdata = await AsyncStorage.getItem('cartdata')
            console.log('cartarray', cartdata)
            if (cartItem) {
                let data1 = JSON.stringify(data)
                cartItem[0] = JSON.parse(cartdata)
                cartItem[1] = data
                console.log('data', data, '\ncartItem', cartItem)
                await AsyncStorage.setItem('cartdata', JSON.stringify(cartItem))
            } else {
                let data1 = JSON.stringify(data)
                await AsyncStorage.setItem('cartdata', data1)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const setCart = async (data) => {
        let cartItem = []
        try {
            cartItem = await AsyncStorage.getItem('cartdata')
            cartItem = JSON.parse(cartItem)

            cartItem = [...cartItem, data]
            await AsyncStorage.setItem('cartdata', JSON.stringify(cartItem))
            console.log('cartarray', cartItem)
        }
        catch (e) {
            console.log('error', e)
        }
    }
    const items = [
        { "name": 'Product1', "price": 'Rs. 500', "url": image },
        { "name": 'Product2', "price": 'Rs. 600', "url": image },
        { "name": 'Product3', "price": 'Rs. 300', "url": image },
        { "name": 'Product4', "price": 'Rs. 400', "url": image },
    ]
    return (
        <View>
            <View style={styles.bg_blue}>
                <View style={styles.row}>
                    <Icon name='bars' size={20} />
                    <Icon name='shopping-cart' size={25} onPress={() => navigation.navigate('Cart')} />
                </View>
                <SearchBar leftIcon={
                    <Icon
                        name='search'
                        size={20}
                        color='black'
                        type='FontAwesome'
                    />}
                    inputContainerStyle={styles.search}
                    style={styles.search} value={search} placeholder='Search' onChangeText={setSearch} containerStyle='' />
            </View>
            <ScrollView style={styles.sectionContainer}>
                {state.products ? state.products.data ?
                    state.products.data.map(data => {
                        return (
                            <View>
                                <Text>{data.attributes.title}</Text>
                            </View>
                        )

                    })
                    : <View></View> : <View></View>}
            </ScrollView>
        </View>
    )
}
export default Home;

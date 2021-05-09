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
import Card from '../components/Card'
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
        console.log('dataget', data)
        let cartItem = []
        let cartget
        try {
            cartget = await AsyncStorage.getItem('cartdata')
            cartget = JSON.parse(cartget)
            let x = 0
            if (cartget) {
                for (x; x < cartget.length; x++) {
                    cartItem.push(cartget[x])
                }

                cartItem.push(data)
            }

            else cartItem = data
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
                    <Icon name='bars' size={25} />
                    <Icon name='shopping-cart' size={30} onPress={() => navigation.navigate('Cart')} />
                </View>
                <Input leftIcon={
                    <Icon
                        style={styles.search_icon}
                        name='search'
                        size={20}
                        color='black'
                        type='FontAwesome'
                    />}
                    style={styles.search} value={search} placeholder='Search' onChangeText={setSearch} containerStyle=''
                    underlineColorAndroid='rgba(0,0,0,0)' />
            </View>
            <ScrollView style={{ ...styles.sectionContainer, }}>
                {state.products ? state.products.data ?
                    state.products.data.map(data => {
                        return (
                            <Card>
                                <Text style={styles.sectionTitle}>{data.attributes.title}</Text>
                                <Text style={styles.sectionDescription}>{data.attributes ? data.attributes.price ? data.attributes.price.formatted : '' : ''}</Text>
                                <Button style={styles.button} title='Add to Cart' onPress={() => setCart(data)}></Button>
                            </Card>
                        )

                    })
                    : <View></View> : <View></View>}
            </ScrollView>
        </View>
    )
}
export default Home;

export const homestyle = StyleSheet.create({
    scrolls:{
        // backgroundColor: 'white'
    }
})
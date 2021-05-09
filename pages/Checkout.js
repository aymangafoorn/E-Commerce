import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Input,
    Button
} from 'react-native-elements';
import Card from '../components/Card'
import { styles } from '../components/styles/styles'



const Checkout = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [number, setNo] = useState('')
    const [address, setAddress] = useState('')
    const [change, changeAdress] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [cart, setCart] = useState([])
    const [price, setPrice] = useState(0)
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('cartdata')
            setCart(JSON.parse(jsonValue))
            return jsonValue != null ? jsonValue : null;
        } catch (e) {
            console.log('error', e)
        }
    }
    useEffect(() => {
        getData()
        if (cart) {
            let i = 0
            let price = 0
            for (i; i < cart.length; i++) {
                price = price + parseInt(cart[i].attributes.price.number)
            }
            setPrice(price)
        }
    }, [])
    console.log()
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Checkout Page</Text>
            <ScrollView >
                {change ? <View>
                    <Input style={styles.inputField} value={email} placeholder={'Email'} onChange={setEmail}></Input>
                    <Input style={styles.inputField} value={number} placeholder={'Mobile No'} onChange={setNo}></Input>
                    <Input style={styles.inputField} multiline numberOfLines={4} value={address} placeholder={'Address'} onChange={setAddress}></Input>
                </View> :
                    <View>
                        {/* <Text>{email}</Text>
                        <Text>{number}</Text> */}
                        {/* <Text>{address}</Text> */}
                    </View>}

                <Button title={change ? "Deliver Here" : "Change Address"} type='outline' onPress={change ? () => changeAdress(false) : () => changeAdress(true)}></Button>
                <Input style={styles.inputField} value={coupon} onChange={setCoupon} placeholder={'Enter Coupon Code'} />
                <Text style={styles.sectionTitle}>Purchased Products</Text>
                <View>
                    {cart ? cart.map(data => {
                        return (
                            <Card>
                                <Text >{data.attributes.title}</Text>
                                <Text style={styles.sectionDescription}>{data.attributes ? data.attributes.price ? data.attributes.price.formatted : '' : ''}</Text>
                            </Card>
                        )
                    }) : <Text></Text>}
                </View>
                <Text style={styles.sectionTitle}>Price Details</Text>
                <View style={styles.row}>
                    <Text>Total:</Text><Text>{price!==0?price:''}</Text>
                </View>
                <View style={styles.row}>
                    <Text>No of Products:</Text><Text>{cart.length}</Text>
                </View>
                <View style={styles.row}>
                    <Text>Discount:</Text><Text>0</Text>
                </View>
                <View style={styles.row}>
                    <Text>Amount to Pay:</Text><Text>{price!==0?price:''}</Text>
                </View>
                <Button title="Continue" type='outline' onPress={() => navigation.navigate('Payment')}></Button>
            </ScrollView>
        </View>
    )
}
export default Checkout;

// const styles = StyleSheet.create({
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,

//     },
//     inputField: {
//         width: 300,
//         marginVertical: 2,
//     },
//     sectionTitle: {
//         fontSize: 32,
//         fontWeight: '700',
//         color: 'grey',
//         marginTop: 10,
//         marginBottom: 5
//     },
// });
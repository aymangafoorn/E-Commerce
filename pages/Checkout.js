import React, { useState } from 'react';

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
const Checkout = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [number, setNo] = useState('')
    const [address, setAddress] = useState('')
    const [coupon, setCoupon] = useState('')
    return (
        <View>
            <Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Checkout Page</Text>
                    <Input style={styles.inputField} value={email} placeholder={'Email'} onChange={setEmail}></Input>
                    <Input style={styles.inputField} value={number} placeholder={'Mobile No'} onChange={setNo}></Input>
                    <Input style={styles.inputField} multiline numberOfLines={4} value={address} placeholder={'Address'} onChange={setAddress}></Input>
                    <Input style={styles.inputField} value={coupon} onChange={setCoupon} placeholder={'Enter Coupon Code'} />
                    <Button title="Checkout" type='outline' onPress={()=>navigation.navigate('Home')}></Button>
                </View>
            </Text>
        </View>
    )
}
export default Checkout;

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,

    },
    inputField: {
        width: 300,
        marginVertical: 2,
    },
    sectionTitle:{
        fontSize: 32,
        fontWeight: '700',
        color: 'grey',
        marginTop: 10,
        marginBottom: 5
    },
});
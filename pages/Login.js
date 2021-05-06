import React, { useContext, useEffect, useState } from 'react';
import { Context as UserContext } from '../context/Context'
import { styles } from '../components/styles/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import {
    Input,
    Button,
    CheckBox
} from 'react-native-elements';



const Login = ({ navigation }) => {
    const { state, login } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('');
    const [showpass, hidePass] = useState(false);
    const setlog = () => {
        if (email == '')
            Alert.alert('Email not found')
        else if (password == '')
            Alert.alert('password not found')
        else {
            login(email, password)
            if (state.success ==='success') {
                navigation.navigate('Home')
            }
        }
    }
    if (state.success ==='success') {
        navigation.navigate('Home')
    }
    console.log('successda',state.success)
    useEffect(() => {
        if (state.success ==='success') {
            navigation.navigate('Home')
        }
    }, [])

    return (
        <View>
            <View style={[styles.sectionContainer, styles.center]}>
                <Text style={styles.mainTitle}>Welcome</Text>
                <Input style={styles.inputField} value={email} placeholder='Enter Email' onChangeText={setEmail}></Input>
                <Input style={styles.inputField} secureTextEntry={!showpass} value={password} placeholder='Enter Password' onChangeText={setPass}></Input>
                <CheckBox
                    title='Show Password'
                    style={{backgroundColor:'transparent'}}
                    checked={showpass}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={() => showpass ? hidePass(false) : hidePass(true)}
                />
                <Button type="outline" title="Login" onPress={() => setlog()}>Login</Button>
            </View>

        </View>
    )
}
export default Login;


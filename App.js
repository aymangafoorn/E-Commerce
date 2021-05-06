import React, { useState } from 'react';
import { Provider } from './context/createContext'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login'
import Home from './pages/Home'
import Splash from './pages/Splash'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ContextProvider } from './context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();


const App = () => {
  const [token, getToken] = useState()
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userdata')
      getToken(jsonValue)
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      console.log('error', e)
    }
  }

  console.log('home', token)
  const [timer, setTimer] = useState(true)
  React.useEffect(() => {
    getData()
    setTimeout(function () {
      setTimer(false)
    }, 5000)
  }, [])
  if (timer)
    return <Splash></Splash>
  else {
    if (token)
      return (
        <ContextProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={Home} headerMode={false}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Cart" component={Cart} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ContextProvider>
      )
    else {
      return (
        <ContextProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={Login} headerMode={false}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Checkout" component={Checkout} />
              </Stack.Navigator>

            </NavigationContainer>
          </SafeAreaProvider>
        </ContextProvider>
      )

    }
  };}
  export default App;

import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { styles } from '../components/styles/styles';


const SplashScreen = () =>{
    return(
      <View style={styles.Splash}>
        <Text style={styles.splashTitle}>E Commerce</Text>
      </View>
    )
  }
  export default SplashScreen
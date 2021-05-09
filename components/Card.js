
import React from 'react';
import { StyleSheet, View} from 'react-native';
const Card = props => {
    return (
        <View style={{...styles.boxContainer, ...props.style}}>
            {props.children}
        </View>

    );

};


const styles = StyleSheet.create({

    boxContainer:{
        shadowColor: '#f0ffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        elevation: 5,
        backgroundColor:'white'
    }

});

export default Card;
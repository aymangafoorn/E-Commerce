
import {
    StyleSheet,
    Dimensions
} from 'react-native'
import { white } from 'react-native-paper/lib/typescript/styles/colors';

export const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,

    },
    center:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center'
    },
    search:{
        backgroundColor: 'white',
        height: 5
    },
    inputField: {
        width: 300,
        marginVertical: 4,
    },
    mainTitle:{
        fontSize: 32,
        fontWeight: '700',
        color: 'grey'
    },
    button: {
        marginVertical: 22
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 22
    },
    highlight: {
        fontWeight: '700',
    },
    image: {
        width: '100%'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bg_blue: {
        backgroundColor: 'lightblue',
        paddingHorizontal: 24,
        paddingTop:10,
    },
    Splash:{
        height: Dimensions.get("window").height,
        width: Dimensions.get('window').width,
        backgroundColor: 'lightblue',
        color: 'white',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        flex: 1
    },
    splashTitle:{
        fontSize: 30,
        fontWeight: '700'
    },
    card:{
       borderWidth: 1,
       marginVertical: 5,
       padding:5,
        
    },
    search_icon:{
        backgroundColor: 'white',
        height: 40,
        width: 25,
        display: 'flex',
        alignItems:  'center',
        justifyContent: 'center'
    }
});
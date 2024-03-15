import { Button, StyleSheet, Text, View,Dimensions,TextInput } from 'react-native';
import { ScrollView } from 'react-native';
const Home=(props)=>{
    return <>
        <ScrollView>
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Form Details</Text>
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.inputCard}>
                        <Text style={styles.text}>Enter your text</Text>
                        <TextInput placeholder='Text' style={styles.input}></TextInput>
                    </View>
                </View>
            </View>
            {/* <View style={styles.container}>
                <Text>This is home page</Text>
                <Button title='Login Page' onPress={()=>{props.navigation.navigate('Login')}}></Button>
            </View> */}
        </ScrollView>
    </>
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        width:110,
        borderWidth:1,
        backgroundColor:'#ededfe',
        borderColor:'#1944d2',
        marginTop:20,
        height:32,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:20
    },
    headerText:{
        textAlign:'center',
        color:'#1944d2',
        fontWeight:'400'
    },
    inputCard:{
        marginTop:10
    },
    text:{
        fontWeight:'300',
        fontSize:13,
        color:'black',
        paddingLeft:5
    },
    input:{
        fontSize:14,
        marginTop:4,
        padding:10,
        height:43,
        borderRadius:5,
        backgroundColor:'#dfdfdf'
    },
    inputBox:{
        marginTop:10,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
    },
})
export default Home


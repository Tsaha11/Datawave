import { Image, StyleSheet, Text, View,ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Login=(props)=>{
    return <>
    <ScrollView>
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/background.png')}  resizeMode="cover"></Image>
            <View style={styles.imageBox}>
                <Image style={[styles.img1, { transform: [{ rotateZ: '-15deg' }] }]} source={require('../assets/img1.png')}></Image>
                <Image style={[styles.img2, { transform: [{ rotateZ: '15deg' }] }]} source={require('../assets/images-removebg-preview.png')}></Image>
            </View> 
            <View style={styles.titleBox}>
                <Text style={styles.header}>Signup</Text>
            </View>
            <View style={styles.inputBox}>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your name</Text>
                    <TextInput placeholder='Name' style={styles.input}></TextInput>
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your email</Text>
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your password</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={true} // Set secureTextEntry to true
                    />
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Confirm your password</Text>
                    <TextInput
                        placeholder='Confirm Password'
                        style={styles.input}
                        secureTextEntry={true} // Set secureTextEntry to true
                    />
                </View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                    <View style={styles.signup}>
                        <Text style={styles.signupbtn}>Already have an account <Text style={{fontWeight:'900'}}>Login</Text></Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.submitContainer}>
                    <TouchableOpacity>
                        <LinearGradient
                        colors={['#24a1cb', '#2772db', '#176fb7']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        >
                        <Text style={styles.submitText}>Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
    </>
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth, // Set width to cover the entire screen
        height: windowHeight, // Set height to cover the entire screen
        paddingTop:60
    },
    imageBox:{
        width:"100%",
        marginLeft:'auto',
        marginRight:'auto',
        height:"10%",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    titleBox:{
        marginTop:40,
        textAlign:'center',
    },
    inputBox:{
        marginTop:100,
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
    },
    signupbtn:{
        paddingTop:6,
        paddingBottom:19,
        fontSize:12,
        textDecorationLine:'underline'
    },
    inputCard:{
        marginTop:10
    },
    submitBtn:{
        borderRadius:20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#2d7abd',
        height:40,
        color:'white'
    },
    linearGradient: {
        padding: 10,
        borderRadius: 15,
    },
    text:{
        fontWeight:'300',
        fontSize:13,
        color:'black'
    },
    input:{
        fontSize:14,
        marginTop:4,
        padding:10,
        height:43,
        borderRadius:20,
        backgroundColor:'#dfdfdf'
    },
    submitText:{
        textAlign:'center',
        color:'white',
    },
    submitContainer:{
        borderRadius:20
    },
    header:{
        textAlign:'center',
        color:'white',
        fontSize:40,
        fontWeight:'900',
        letterSpacing:2
    },
    img:{
        position:'absolute',
        width:'100%',
        height:'100%',
    },
    img1:{
        width:'20%',
        height:'100%',
    },
    img2:{
        width:'20%',
        height:'100%',
    }
});



export default Login
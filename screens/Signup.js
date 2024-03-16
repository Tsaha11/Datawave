import { Image, StyleSheet, Text, View,ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import ProgressBar from '../src/Progressbar';
import firebaseConfig from '../firebaseconfig';
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import { updateProfile } from 'firebase/auth';

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login=(props)=>{
    const [cnt,setCnt]=useState(1);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const isEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };
    useEffect(()=>{
        if(isEmail(email) && password.length>=6 && password===confirmpassword && name!==""){
            setCnt(1);
        }
        else if(isEmail(email)){
            setCnt(3);
        }
        else if(password.length>=6){
            setCnt(3);
        }
        else if(password.length>=6 && isEmail(email)){
            setCnt(2);
        }
        else{
            setCnt(0);
        }
    },[name,email,password,confirmpassword])
    const submitHandler=()=>{
        if(cnt===1){
            const res = createUserWithEmailAndPassword(auth, email, password);
            res.then((result) => {
                // After user creation, update user's display name
                updateProfile(result.user, {
                    displayName: name // Replace "John Doe" with the actual name
                }).then(() => {
                    alert("User created successfully");
                    props.navigation.navigate("Login");
                }).catch((error) => {
                    alert("Error updating user profile: " + error.message);
                });
            }).catch((error) => {
                alert("Error occurred: " + error.message);
            });
        }
        else{
            alert("Wrong credentials")
        }
    }
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
            <ScrollView>
            <View style={styles.inputBox}>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your name</Text>
                    <TextInput placeholder='Name' style={styles.input} onChangeText={(text)=>{
                        setName(text)
                    }}></TextInput>
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your email</Text>
                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        onChangeText={(text)=>{
                            setEmail(text)
                        }}
                    />
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your password</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={true} // Set secureTextEntry to true
                        onChangeText={(text)=>{
                            setPassword(text);
                        }}
                    />
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Confirm your password</Text>
                    <TextInput
                        placeholder='Confirm Password'
                        style={styles.input}
                        secureTextEntry={true} // Set secureTextEntry to true
                        onChangeText={(text)=>{
                            setConfirmpassword(text)
                        }}
                    />
                </View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                    <View style={styles.signup}>
                        <Text style={styles.signupbtn}>Already have an account <Text style={{fontWeight:'900'}}>Login</Text></Text>
                    </View>
                </TouchableOpacity>
                <ProgressBar progress={90} color={cnt===1?'#10d110':'#f03232'} width={cnt!==0?windowWidth/(cnt):3}></ProgressBar>
                <View style={styles.submitContainer}>
                    <TouchableOpacity onPress={submitHandler}>
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
            </ScrollView>
        </View>
    </ScrollView>
    </>
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        minHeight:windowHeight,
        width: windowWidth, // Set width to cover the entire screen // Set height to cover the entire screen
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
        color:'black',
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
import { Image, StyleSheet,Button, Text, View,ScrollView, Dimensions, TextInput, TouchableOpacity,Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '../src/Progressbar';
import firebaseConfig from '../firebaseconfig';
import { useEffect, useState } from 'react';
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut} from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Login=(props)=>{
    const [modal,setModal]=useState(false);
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [name,setName]=useState("");
    const [cnt,setCnt]=useState(0);
    
    const isEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(text);
    };
    const textHandler=(text)=>{
        setemail(text);
    }
    useEffect(()=>{
        if(isEmail(email) && password.length>=6){
            setCnt(1);
        }
        else if(isEmail(email)){
            setCnt(2);
        }
        else if(password.length>=6){
            setCnt(2);
        }
        else{
            setCnt(0);
        }
    },[email,password])
    const submitHandler=async()=>{
        if(cnt===1){
            const res=signInWithEmailAndPassword(auth,email, password)
            res.then(result => {
                setName(result._tokenResponse.displayName)
                setModal(true)
                AsyncStorage.setItem('user',JSON.stringify(result))
                // console.log(result.user.stsTokenManager.accessToken)
            })
            .catch(error => { 
                alert('Error occured', error.message);
            });
        }
        else{
            alert("Wrong credentials")
        }
    }
    return <>
    <ScrollView>
        <Modal transparent={true} visible={modal} animationType='slide'>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View>
                        <Image style={styles.img} source={require('../assets/tick.jpeg')}></Image>
                    </View>
                    <Text style={styles.modalText}>Welcome {name}</Text>
                    <Button title='Home' style={{borderRadius:20}} onPress={()=>props.navigation.navigate('Home')}></Button>
                </View>
            </View>
        </Modal>
        <View style={styles.container}>
            <Image style={styles.img} source={require('../assets/background.png')}  resizeMode="cover"></Image>
            <View style={styles.imageBox}>
                <Image style={[styles.img1, { transform: [{ rotateZ: '-15deg' }] }]} source={require('../assets/img1.png')}></Image>
                <Image style={[styles.img2, { transform: [{ rotateZ: '15deg' }] }]} source={require('../assets/images-removebg-preview.png')}></Image>
            </View> 
            <View style={styles.titleBox}>
                <Text style={styles.header}>Login</Text>
            </View>
            <View style={styles.inputBox}>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your email</Text>
                    <TextInput placeholder='Email' style={styles.input} onChangeText={(text)=>{textHandler(text)}}></TextInput>
                </View>
                <View style={styles.inputCard}>
                    <Text style={styles.text}>Enter your password</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={true} // Set secureTextEntry to true
                        onChangeText={(text)=>{setpassword(text)}}
                    />
                </View>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Signup')}}>
                    <View style={styles.signup}>
                        <Text style={styles.signupbtn}>Dont have an account <Text style={{fontWeight:'900'}}>Signup</Text></Text>
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
        </View>
    </ScrollView>
    </>
}
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
        marginTop:140,
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
        fontWeight:'600',
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    },
    modalContent: {
        backgroundColor: '#fff', // background color of the modal content
        padding: 20,
        width:200,
        minHeight:100,
        borderRadius: 10,
    },
    modalText:{
        textAlign:'center',
        fontWeight:'500',
        margin:6
    }
});



export default Login
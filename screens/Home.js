import { useEffect, useState } from 'react';
import { Button,Image, StyleSheet, Text, View,Dimensions,TextInput,Platform, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native';
import { Switch } from 'react-native-web';
import Linegraph from '../src/Linegraph';
import { LinearGradient } from 'expo-linear-gradient';
import Piegraph from '../src/Piegraph';
import Bragraph from '../src/Bargraph';
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import firebaseConfig from '../firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext } from 'react';
import { useMyContext } from '../context/useContext';
import Footer from './Footer';
const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const Home=({navigation})=>{
    const { value, handleChange } = useMyContext();
    const [data,setData]=useState([])
    const {addData,removeData,fetchHandler}=useMyContext();
    const [user,setUser]=useState(null);
    const [mode,setMode]=useState(true);
    const [text,setText]=useState("");
    const [num,setNum]=useState(0);
    const [errorNum,setErrorNum]=useState(false);
    const [graphTab,setGraphTab]=useState(1);
    const [modal,setModal]=useState(false);
    const errNumHanlder=(text)=>{
        setNum(text)
        const pattern = /^[0-9]+$/;
        if (pattern.test(num)) {
            setErrorNum(false);
        }else{
            setErrorNum(true);
        }
    }
    useEffect(() => {
        navigation.setOptions({
          headerTitle: 'Datawave', 
          headerBackground: () => (
            <LinearGradient
              colors={mode?['#4e80f7', '#3556b3']:['#000000', '#000000']}
              start={[0, 0.5]}
              end={[1, 0.5]}
              style={{ flex: 1 }}
            />
          ),
          headerTintColor: '#ffffff', // Change header text color
          headerTitleStyle: {
            fontWeight: 'bold', // Change header title style
          },
        });
    }, [mode]);
    const removeHandler=async()=>{
        await removeData();
        const d=await fetchHandler();
        setData(d);
    }
    const submitHandler=async()=>{
        const pattern = /^[0-9]+$/;
        if(text==="" || !pattern.test(num)){
            alert("Validation error")
            return false;
        }
        await addData({text,num})
        const d=await fetchHandler();
        setData(d);
        setText("");
        setNum("");
        setModal(true);
    }
    useEffect(()=>{
        const getMode=async()=>{
            const m=await AsyncStorage.getItem('mode');
            console.log(m)
        }
        getMode();
    },[])
    useEffect(()=>{
        const fetchHandler=async()=>{
            const user=await AsyncStorage.getItem('user')
            setUser(user);
        }
        fetchHandler();
    },[])
    const modeChange=()=>{
        setMode(!mode);
    }
    useEffect(()=>{
        const fetchData=async()=>{
            const d=await fetchHandler();
            setData(d);
        }
        fetchData();
    },[addData,removeData])
    return <>
        <ScrollView>
        <Modal transparent={true} visible={modal} animationType='slide'>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View>
                        <Image style={styles.img} source={require('../assets/tick.jpeg')}></Image>
                    </View>
                    <Text style={styles.modalText}>Data added</Text>
                    <Button title='Close' style={{borderRadius:20}} onPress={()=>setModal(false)}></Button>
                </View>
            </View>
        </Modal>
            <View style={[{justifyContent:'space-between',flex:1,flexDirection:'column',backgroundColor:!mode?'#212121':'#f2f2f2'}, ]}>
                <TouchableOpacity onPress={modeChange}>
                    <View style={mode?styles.modeBox:styles.darkmodeBox}>
                        <View style={styles.modelImage}>
                            {mode && <Image style={styles.modelImg} source={require('../assets/4808961-200-removebg-preview.png')}></Image>}
                            {!mode && <Image style={styles.modelImg} source={require('../assets/images.png')}></Image>}
                        </View>
                        <View style={styles.modelImage}>
                            <Text style={{fontSize:12.3,color:mode?'black':'white'}}>{mode?'Light':'Dark'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={mode?styles.header:styles.darkheader}>
                    <Text style={mode?styles.headerText:styles.darkheaderText}>Form Details {value}</Text>
                </View>
                <View style={[styles.inputBox, styles.shadowContainer]}>
                    <View style={styles.inputCard}>
                        <Text style={mode?styles.text:styles.darktext}>Enter the text</Text>
                        <TextInput placeholderTextColor={mode?'#858585':'#999999'} placeholder='Text' value={text} style={mode?styles.input:styles.darkinput} onChangeText={(text)=>setText(text)}></TextInput>
                    </View>
                    <View style={styles.inputCard}>
                        <Text style={mode?styles.text:styles.darktext}>Enter the number</Text>
                        <TextInput placeholderTextColor={mode?'#858585':'#999999'} placeholder='Number eg. 0-9' value={num} style={mode?styles.input:styles.darkinput} onChangeText={(text)=>errNumHanlder(text)}></TextInput>
                        {errorNum && <Text style={styles.error}>enter valid number eg 123</Text>}
                    </View> 
                    <View style={styles.btns}>
                    <TouchableOpacity onPress={submitHandler}>
                        <View style={mode?styles.btnSubmit:styles.darkbtnSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={removeHandler}>
                        <View style={mode?styles.btnSubmit:styles.darkbtnSubmit}>
                            <Text style={styles.submitText}>Clear</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={mode?styles.header1:styles.darkheader1}>
                    <Text style={mode?styles.headerText:styles.darkheaderText}>Data Representation</Text>
                </View>
                <View style={styles.tabs}>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(1);
                    }}>
                        <View style={mode?[styles.tab, graphTab===1 && styles.activeTab]:[styles.darktab, graphTab===1 && styles.darkactiveTab]}>
                            <Text style={mode?[styles.tabText, graphTab===1 && styles.activeText]:[styles.darktabText, graphTab===1 && styles.darkactiveText]}>Bar Chart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(2);
                    }}>
                        <View style={mode?[styles.tab, graphTab===2 && styles.activeTab]:[styles.darktab, graphTab===2 && styles.darkactiveTab]}>
                            <Text style={mode?[styles.tabText, graphTab===2 && styles.activeText]:[styles.darktabText, graphTab===2 && styles.darkactiveText]}>Pie Chart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(3);
                    }}>
                        <View style={mode?[styles.tab, graphTab===3 && styles.activeTab]:[styles.darktab, graphTab===3 && styles.darkactiveTab]}>
                            <Text style={mode?[styles.tabText, graphTab===3 && styles.activeText]:[styles.darktabText, graphTab===3 && styles.darkactiveText]}>Line Chart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {graphTab===3 && <Linegraph data={data} mode={mode}></Linegraph>}
                    {graphTab===1 && <Bragraph data={data} mode={mode}></Bragraph>}
                    {graphTab===2 && <Piegraph data={data} mode={mode}></Piegraph>}
                </View>
                <View>
                    <Footer mode={mode}></Footer>
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
    btns:{
        flex:1,
        flexDirection:'row',
    },
    btnSubmit:{
        width:70,
        marginTop:14,
        borderRadius:5,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:10,
        paddingRight:10,
        marginRight:6,
        backgroundColor:'#2c6fcd',
    },
    darkbtnSubmit:{
        width:70,
        marginTop:14,
        borderRadius:5,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:10,
        paddingRight:10,
        marginRight:6,
        backgroundColor:'#000000',
    },
    subHeading:{
        width:'94%',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10
    },
    subHeadertext:{
        fontWeight:'600',
        fontSize:12,
        textAlign:'center'

    },
    submitText:{
        color:'white',
        fontSize:13,
        textAlign:'center'
    },
    header:{
        width:95,
        borderWidth:1,
        backgroundColor:'#ededfe',
        borderColor:'#1944d2',
        marginTop:0,
        height:32,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:20,
    },
    darkheader:{
        width:95,
        borderWidth:1,
        backgroundColor:'#ededfe',
        borderColor:'#ffffff',
        marginTop:0,
        height:32,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:20,
        backgroundColor:'black',
    },
    header1:{
        width:135,
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
        borderRadius:20,
    },
    darkheader1:{
        width:135,
        borderWidth:1,
        backgroundColor:'#000000',
        borderColor:'#ffffff',
        marginTop:20,
        height:32,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:20,
    },
    headerText:{
        textAlign:'center',
        color:'#1944d2',
        fontWeight:'400',
        fontSize:12
    },
    darkheaderText:{
        textAlign:'center',
        color:'#ffffff',
        fontWeight:'400',
        fontSize:12
    },
    inputCard:{
        marginTop:5
    },
    text:{
        fontWeight:'300',
        fontSize:13,
        color:'#3c3c3c',
        paddingLeft:5
    },
    darktext:{
        fontWeight:'300',
        fontSize:13,
        color:'#ffffff',
        paddingLeft:5
    },
    input:{
        fontSize:13,
        marginTop:4,
        padding:10,
        height:43,
        borderRadius:5,
        backgroundColor:'#dfdfdf'
    },
    darkinput:{
        fontSize:13,
        marginTop:4,
        padding:10,
        height:43,
        borderRadius:5,
        backgroundColor:'#000000',
        color:'white'
    },
    inputBox:{
        marginTop:10,
        width:'94%',
        marginLeft:'auto',
        marginRight:'auto',  
        shadowRadius: 3,  
        borderWidth:0,
        padding:7,
        borderRadius:1,
    },
    shadowContainer: {
        ...Platform.select({
          ios: {
            shadowColor: '#9a9a9a',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
          },
        }),
    },
    elevation: {  
        shadowColor: '#52006A',  
        elevation: 20,  
      },  
    error:{
        color:'red',
        fontSize:12,
        paddingLeft:5
    },
    tabs:{
        width:'90%',
        display:'flex',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-around',
        height:40,
    },
    tab:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    darktab:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        color:'white'
    },
    activeTab:{
        borderBottomWidth:1,
        borderColor:'blue',
        paddingBottom:8
    },
    darkactiveTab:{
        borderBottomWidth:1,
        borderColor:'#f6b612',
        paddingBottom:8
    },
    activeText:{
        color:'blue'
    },
    darkactiveText:{
        color:'#f6b612'
    },
    tabText:{
        textAlign:'center',
    },
    darktabText:{
        textAlign:'center',
        color:'#f6f6f6'
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
    img:{
        width:100,
        height:50,
        margin:'auto',
        borderWidth:1,
        marginLeft:'auto',
        marginRight:'auto',
    },
    modalText:{
        textAlign:'center',
        fontWeight:'500',
        margin:6
    },
    modeBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width:70,
        height:30,
        margin:10,
        borderWidth:0.3,
        borderRadius:10,
        borderColor:'black',
    },
    darkmodeBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        width:70,
        height:30,
        margin:10,
        borderWidth:0.3,
        borderRadius:10,
        backgroundColor:'black',
        borderColor:'#ffffff',
    },
    modelImage:{
        display:'flex',
        flexDirection:'column',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    modelImg:{
        width:20,
        height:20,
        borderRadius:20
    }
})
export default Home


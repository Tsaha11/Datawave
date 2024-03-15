import { useState } from 'react';
import { Button,Image, StyleSheet, Text, View,Dimensions,TextInput,Platform, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native';
import { Switch } from 'react-native-web';
import Linegraph from '../src/Linegraph';
import Piegraph from '../src/Piegraph';
import Bragraph from '../src/Bargraph';
const Home=(props)=>{
    const [text,setText]=useState("");
    const [num,setNum]=useState("");
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
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Form Details</Text>
                </View>
                <View style={[styles.inputBox, styles.shadowContainer]}>
                    <View style={styles.inputCard}>
                        <Text style={styles.text}>Enter the text</Text>
                        <TextInput placeholder='Text' style={styles.input}></TextInput>
                    </View>
                    <View style={styles.inputCard}>
                        <Text style={styles.text}>Enter the number</Text>
                        <TextInput placeholder='Number eg. 0-9' style={styles.input} onChangeText={(text)=>errNumHanlder(text)}></TextInput>
                        {errorNum && <Text style={styles.error}>enter valid number eg 123</Text>}
                    </View> 
                    <TouchableOpacity>
                        <View style={styles.btnSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.header1}>
                    <Text style={styles.headerText}>Data Representation</Text>
                </View>
                <View style={styles.tabs}>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(1);
                    }}>
                        <View style={[styles.tab, graphTab===1 && styles.activeTab]}>
                            <Text style={[styles.tabText, graphTab===1 && styles.activeText]}>Line Chart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(2);
                    }}>
                        <View style={[styles.tab, graphTab===2 && styles.activeTab]}>
                            <Text style={[styles.tabText, graphTab===2 && styles.activeText]}>Bar Chart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab} onPress={()=>{
                        setGraphTab(3);
                    }}>
                        <View style={[styles.tab, graphTab===3 && styles.activeTab]}>
                            <Text style={[styles.tabText, graphTab===3 && styles.activeText]}>Pie Chart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {graphTab===1 && <Linegraph></Linegraph>}
                    {graphTab===3 && <Piegraph></Piegraph>}
                    {graphTab===2 && <Bragraph></Bragraph>}
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
    btnSubmit:{
        width:70,
        marginTop:14,
        borderRadius:5,
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#2c6fcd',
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
    headerText:{
        textAlign:'center',
        color:'#1944d2',
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
    activeTab:{
        borderBottomWidth:1,
        borderColor:'blue',
        paddingBottom:8
    },
    activeText:{
        color:'blue'
    },
    tabText:{
        textAlign:'center',
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
    }
})
export default Home


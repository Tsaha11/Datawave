import { Button, StyleSheet, Text, View } from 'react-native';
const Home=(props)=>{
    return <>
        <View><Text>This is home page</Text></View>
        <Button title='Login Page' onPress={()=>{props.navigation.navigate('Login')}}></Button>
    </>
}
export default Home

const style=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'yellow',
    }
})

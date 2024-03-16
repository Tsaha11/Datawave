import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Home from "./screens/Home"
import {MyProvider} from './context/useContext';
// Function to trigger a reload

import Login from './screens/Login';
import Signup from "./screens/Signup"
import { Switch } from 'react-native';
import { useEffect, useState } from 'react';
import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import firebaseConfig from './firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)
const Stack = createNativeStackNavigator();
export default function App(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [user,setUser]=useState(AsyncStorage.getItem('user'));
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  useEffect(()=>{
    const fetchHandler=async()=>{
        const user=await AsyncStorage.getItem('user')
        setUser(user);
    }
    fetchHandler();
  },[])

  const logoutHandler=async()=>{
    await AsyncStorage.removeItem('user');
    setUser(null)
  }
  return (
    <MyProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Datawave',
            headerBackground: () => (
              <LinearGradient
                colors={['#4e80f7', '#3556b3']}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={{ flex: 1 }}
              />
            ),
            headerTintColor: '#ffffff', // Text color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <>
                <Switch
                  trackColor={{ false: "#bababa", true: "#535353" }}
                  thumbColor={isEnabled ? "#000000" : "#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                {!user && <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Login</Text>
                  </View>
                </TouchableOpacity>}
                {user && <TouchableOpacity onPress={logoutHandler}>
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Logout</Text>
                  </View>
                </TouchableOpacity>}
              </>
            ),
          })}
        />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login:{
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:4,
    backgroundColor:'#11af3e'
  },
  loginText:{
    color:'white',
    fontWeight:'400',
    fontSize:12
  }
});

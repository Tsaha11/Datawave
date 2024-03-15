import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import Home from "./screens/Home"
import Login from './screens/Login';
import Signup from "./screens/Signup"
const Stack = createNativeStackNavigator();
export default function App(props) {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName="Home">
       <Stack.Screen name="Home" component={Home} options={{
            title: 'Home',
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
              <TouchableOpacity>
                <View style={styles.login}>
                  <Text style={styles.loginText}>Login</Text>
                </View>
              </TouchableOpacity>
            ),
          }}/>
       <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
       <Stack.Screen name="Signup" component={Signup}  options={{ headerShown: false }}/>
     </Stack.Navigator>
    </NavigationContainer>

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
    borderWidth:0.5,
    borderColor:'white',
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:15,
    paddingRight:15,
    borderRadius:4,
    backgroundColor:'#6b9dee'
  },
  loginText:{
    color:'white',
    fontWeight:'400'
  }
});

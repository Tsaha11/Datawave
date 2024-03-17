import React from 'react';
import { View,Image, Text, StyleSheet,Linking, TouchableOpacity } from 'react-native';

const Footer = ({mode}) => {
  return (
    <View style={mode?styles.footer:styles.darkfooter}>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>Linking.openURL('https://github.com/Tsaha11/Datawave')}>
            <Image style={styles.img} source={require('../assets/github.jpeg')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL('https://www.linkedin.com/in/tuhin-saha-6568a2247/')}>
            <Image style={styles.img} source={require('../assets/linkedin.jpeg')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL('https://leetcode.com/Tsaha11/')}>
            <Image style={styles.img} source={require('../assets/leetcode.png')}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  darkfooter: {
    backgroundColor: '#000000',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  container:{
    display:'flex',
    flexDirection:'row',
    marginTop:'auto',
    justifyContent:'center',
  },
  img: {
    width:36,
    height:36,
    marginLeft:6,
    marginRight:6,
    borderRadius:20
  },
});

export default Footer;

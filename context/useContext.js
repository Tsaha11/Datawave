import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();
export const MyProvider = ({ children }) => {
    const [value, setValue] = useState('');
    const [mode,setMode]=useState('light');
    const handleChange = newValue => {
        setValue(newValue);
    };
    const addData=async({text,num})=>{
        const jsonValue = await AsyncStorage.getItem('data');
        let existingArray = jsonValue ? JSON.parse(jsonValue) : [];
        await existingArray.push({text,num});
        const updatedArray =JSON.stringify(existingArray);
        await AsyncStorage.setItem('data', updatedArray);
        await fetchHandler();
    }
    const removeData=async()=>{
        await AsyncStorage.removeItem('data');
        await fetchHandler();
    }
    const fetchHandler=async()=>{
        const d=await AsyncStorage.getItem('data');
        const data=JSON.parse(d);
        if(data){
          return data;
        }
        else{
          return [];
        }
    }
    const fetchMode=async()=>{
      const mode = await AsyncStorage.getItem('mode');
      let existingMode = mode ? mode : 'light';
      setMode(mode);
    }
    const modeChange=async()=>{
      if(mode==='light'){
        await AsyncStorage.setItem('mode','dark');
      }
      else{
        await AsyncStorage.setItem('mode','light');
      }
    }
    useEffect(()=>{
      fetchHandler();
      fetchMode();
    },[])
    return (
      <MyContext.Provider value={{mode,modeChange,value,addData, handleChange,removeData,fetchHandler }}>
        {children}
      </MyContext.Provider>
    );
};
export const useMyContext = () => useContext(MyContext);
import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();
export const MyProvider = ({ children }) => {
    const [value, setValue] = useState('');
    const handleChange = newValue => {
        setValue(newValue);
    };
    const addData=async({text,num})=>{
      console.log(text,num)
        const jsonValue = await AsyncStorage.getItem('data');
        let existingArray = jsonValue ? JSON.parse(jsonValue) : [];
        await existingArray.push({text,num});
        const updatedArray =JSON.stringify(existingArray);
        await AsyncStorage.setItem('data', updatedArray);
    }
    const removeData=async()=>{
        await AsyncStorage.removeItem('data');
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
    useEffect(()=>{
      fetchHandler();
    },[])
    return (
      <MyContext.Provider value={{value,addData, handleChange,removeData,fetchHandler }}>
        {children}
      </MyContext.Provider>
    );
};
export const useMyContext = () => useContext(MyContext);
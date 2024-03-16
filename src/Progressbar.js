import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const ProgressBar = ({ progress,width, color }) => {
  const [filledWidth, setFilledWidth] = useState(0);
  const height=13
  useEffect(() => {
    const calculatedWidth = (progress / 100) * width;
    setFilledWidth(calculatedWidth);
  }, [progress, width]);

  return (<>
  <View>
    <Text style={{fontSize:12}}>Validation meter</Text>
  </View>
    <View style={[styles.container, {  height }]}>
      <View
        style={[
          styles.progressBar,
          { width,height, backgroundColor: color },
        ]}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom:10,
    borderRadius:20,
    borderWidth:0.4,
    borderColor:'darkgreen',
  },
  progressBar: {
    borderRadius: 20,
    width:'100%'
  },
});

export default ProgressBar;

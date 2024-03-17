import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import * as React from 'react';
import { View,Text,Image,Dimensions, StyleSheet, ActivityIndicator } from "react-native";
const screenWidth = Dimensions.get("window").width;
const Piegraph=(props)=>{
const [loader,setLoader]=React.useState(true);
  const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 156, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
  };
  const [dataArr,setData]=React.useState([]);
  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];
  React.useEffect(()=>{
    const fetchData=async()=>{
      if(props.data){
        const d=[];
        const obj=await props.data;
        if(obj){
          for(let i=0;i<obj.length;i++){
            d.push({
              name:obj[i].text,
              population:parseInt(obj[i].num),
              color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
              legendFontColor: "#7F7F7F",
              legendFontSize: 13
            })
          }
        }
        setData(d);
        setLoader(false)
      }
    }
    fetchData();
  },[props.data])
  return<>
      {dataArr.length>0 && <View style={{paddingLeft:'auto',paddingRight:'auto',height:300}}>
          <PieChart
              data={dataArr}
              width={screenWidth}
              height={220}
              style={{marginLeft:5}}
              accessor={"population"}
              chartConfig={chartConfig}
              backgroundColor={"transparent"}
              absolute
          />
      </View>}
      {loader && <View style={{marginTop:20}}><ActivityIndicator color={'black'}>
          </ActivityIndicator></View>}
      {!dataArr.length>0 && !loader && 
      <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:20,minHeight:300}}>
          <Image source={require('../assets/nodata-removebg-preview.png')} style={{width:100,height:100}}></Image>
          <Text style={{fontWeight:'700',fontSize:19}}>
              No data found
          </Text>
      </View>}
  </>
}
export default Piegraph
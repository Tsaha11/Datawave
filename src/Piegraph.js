import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import * as React from 'react';
import { View,Text,Dimensions, StyleSheet, ActivityIndicator } from "react-native";
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
    React.useEffect(()=>{
      const fetchData=async()=>{
        if(props.data){
          const d=[];
          const obj=await props.data;
          if(obj){
            for(let i=0;i<obj.length;i++){
              d.push({
                name:obj[i].text,
                population:obj[i].num,
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
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:20}}>
            <Text style={{fontWeight:'700',fontSize:19}}>
                No data found
            </Text>
        </View>}
    </>
}
export default Piegraph
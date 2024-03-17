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
const Bragraph=(props)=>{
    const [loader,setLoader]=React.useState(true);
    const [textArr,setText]=React.useState([]);
    const [num,setNum]=React.useState([])
    const mode=props.mode;
    React.useEffect(()=>{
        if(props.data){
            const d=props.data;
            const labels=[];
            const numData=[];
            for(var i=0;i<d.length;i++){
                labels.push(d[i].text)
                numData.push(d[i].num)
            }
            setNum(numData)
            setText(labels);
            setLoader(false)
        }
    },[props.data])
    const data = {
        labels: textArr,
        datasets: [
          {
            data: num
          }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: !mode?'#2a2a2a':'#f9eaea',
        backgroundGradientTo: !mode?'#2a2a2a':'#f9eaea',
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 5,
        color: (opacity = 1) => mode?'black':'white',
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return<>
        {num.length>0 && <View style={{minHeight:300}}><BarChart
            data={data}
            width={screenWidth}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
        /></View>}
        {loader && <View style={{marginTop:20}}><ActivityIndicator color={'black'}>
            </ActivityIndicator></View>}

        {!num.length>0 && !loader &&
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:20,minHeight:300}}>
            <Image source={require('../assets/nodata-removebg-preview.png')} style={{width:100,height:100}}></Image>
            <Text style={{fontWeight:'700',fontSize:19,color:mode?'black':'white'}}>
                No Data found
            </Text>
        </View>}
    </>
}
export default Bragraph
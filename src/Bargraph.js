import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import * as React from 'react';
import { View,Text,Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get("window").width;
const Bragraph=(props)=>{
    const [textArr,setText]=React.useState([]);
    const [num,setNum]=React.useState([])
    React.useEffect(()=>{
        if(props.data._j!==null){
            const d=props.data._j;
            const labels=[];
            const numData=[];
            for(var i=0;i<d.length;i++){
                labels.push(d[i].text)
                numData.push(d[i].num)
            }
            setNum(numData)
            setText(labels);
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
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 5,
        color: (opacity = 1) => `rgba(0, 0, 98, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return<>
        {num.length>0 && <BarChart
            data={data}
            width={screenWidth}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
        />}
        {!num.length>0 && 
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:40}}>
            <Text style={{fontWeight:'700',fontSize:19}}>
                No data found
            </Text>
        </View>}
    </>
}
export default Bragraph
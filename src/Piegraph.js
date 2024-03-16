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
const Piegraph=(props)=>{
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
      if(props.data._j!==null){
        const d=[];
        const obj=props.data._j;
        for(let i=0;i<obj.length;i++){
          d.push({
            name:obj[i].text,
            population:obj[i].num,
            color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
            legendFontColor: "#7F7F7F",
            legendFontSize: 13
          })
        }
        setData(d);
      }
    },[props.data._j])
    return<>
        <View>
            <PieChart
                data={dataArr}
                width={screenWidth}
                height={200}
                accessor={"population"}
                chartConfig={chartConfig}
                backgroundColor={"transparent"}
                absolute
            />
        </View>
    </>
}
export default Piegraph
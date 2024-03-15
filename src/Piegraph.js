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
const Piegraph=()=>{
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
    const data = [
        {
          name: "Seoul",
          population: 21500000,
          color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 13
        },
        {
          name: "Toronto",
          population: 2800000,
          color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 13
        },
        {
          name: "Beijing",
          population: 527612,
          color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 13
        },
        {
          name: "New York",
          population: 8538000,
          color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 13
        },
        {
          name: "Moscow",
          population: 11920000,
          color: `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},${1})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 13
        }
    ];
    return<>
        <View>
            <PieChart
                data={data}
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
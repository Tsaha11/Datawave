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
const Bragraph=()=>{
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43]
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
        <BarChart
            data={data}
            width={screenWidth}
            height={300}
            yAxisLabel="$"
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            
        />
    </>
}
export default Bragraph
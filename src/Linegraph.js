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
import { RadioButton } from 'react-native-paper';
const Linegraph=()=>{
    const [checked, setChecked] = React.useState('checked');
    const checkHandler=()=>{
        if(checked==='checked'){
            setChecked('unchecked');
        }
        else{
            setChecked('checked')
        }
    }
    return <>
        <View>
        <View style={styles.radioBtn}>
        <RadioButton
          status={checked}
          onPress={checkHandler}
        />
        <Text style={styles.radio}>Bezier Mode</Text>
        </View>
        <LineChart
            data={{
            labels: ["January", "February", "March", "April", "May", "June","Julu"],
            datasets: [
                {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                ]
                }
            ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: 'yellow',
            backgroundGradientFrom: '#ededed',
            backgroundGradientTo: "#ededed",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 2) => `rgba(6, 67, 209, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "blue"
            }
            }}
            bezier={checked==='checked'}
            style={{
            marginVertical: 8,
            borderRadius: 16
            }}
        />
        </View>
    </>
}

const styles=StyleSheet.create({
    radioBtn:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        width:'95%',
        marginLeft:'auto',
        marginRight:'auto'
    },
    radio:{
        fontSize:13,
        fontWeight:'600'
    }
})




export default Linegraph
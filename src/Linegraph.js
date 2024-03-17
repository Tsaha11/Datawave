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
const Linegraph=(props)=>{
    const mode=props.mode;
    const [textArr,setText]=React.useState([]);
    const [num,setNum]=React.useState([])
    const [checked, setChecked] = React.useState('checked');
    const checkHandler=()=>{
        if(checked==='checked'){
            setChecked('unchecked');
        }
        else{
            setChecked('checked')
        }
    }
    React.useEffect(()=>{
        const fetchHandler=async()=>{
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
                console.log(num,textArr)
            }
        }
        fetchHandler();
    },[props.data])
    return <>
        <View>
        <View style={styles.radioBtn}>
        <RadioButton
          status={checked}
          onPress={checkHandler}
        />
        <Text style={mode?styles.radio:styles.darkradio}>Bezier Mode</Text>
        </View>
        <LineChart
            data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                {
                    data: [20, 45, 28, 80, 99, 43],
                    strokeWidth: 2,
                },
                ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: 'yellow',
            backgroundGradientFrom: !mode?'#2a2a2a':'#eaeaea',
            backgroundGradientTo: !mode?"#2a2a2a":'#eaeaea',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 2) => mode?`rgba(6, 67, 209, ${opacity})`:`rgba(255,255,255, ${opacity})`,
            labelColor: (opacity = 1) => mode?`rgba(0, 0, 0, ${opacity})`:`white`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: mode?"blue":"white"
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
        fontSize:15,
        color:'black'
    },
    darkradio:{
        fontSize:15,
        color:'#ffffff',
    }
})




export default Linegraph
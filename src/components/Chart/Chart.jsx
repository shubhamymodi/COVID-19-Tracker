import React, {useEffect} from "react";
import axios from "axios";
import styles from "./Chart.module.css";
import {Line, Bar} from "react-chartjs-2";


function Chart(props){
  const fetchDailyData = async () => {
      const { data } = await axios.get("https://covid19.mathdro.id/api/daily");
      const modifiedData = data.map((dailyData) =>({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));
      return modifiedData;
    }
    const [dailyData,setDailyData] = React.useState([]);
    useEffect(()=>{
      const fetchAPI = async () => {
        setDailyData( await fetchDailyData());
      }
      fetchAPI();

    });
  const lineChart = (
    dailyData.length
    ? (
      <Line
      data={{
      labels: dailyData.map(({date}) => date),
        datasets: [{
          data: dailyData.map(({confirmed}) => confirmed),
          label: "Infected",
          borderColor: "#3333ff",
          fill: true,
        },{
          data: dailyData.map(({deaths}) => deaths),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255,0,0,0.5)",
          fill: true,
        }],
      }}
      />) : null
    );

    const barChart =(
      props.confirmed
      ?(
        <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: ['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
            data: [props.confirmed,props.recovered,props.deaths]
          }]
        }}
        options={{
          legend: {display: false},
          title: {display: true, text: `Current in state in ${props.country.country}`},
        }}
        />
      ) : null

    )

  return (
    <div className={styles.container}>
      {props.country.country?barChart:lineChart}
    </div>
  )
}

export default Chart;

// [0].confirmed

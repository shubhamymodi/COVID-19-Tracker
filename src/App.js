import React, {useEffect} from "react";
import {Cards, Chart, CountryPicker} from "./components";
import styles from "./App.module.css";
import axios from "axios";
import coronaImage from "./images/image.png";
function App() {
  const [latest, setLatest] = React.useState({
    confirm: null,
    recover: null,
    death: null,
    update: null
  });
  const[country, setCountry] = React.useState({country:null});

const fetchData = async (country)=>{
  const url = "https://covid19.mathdro.id/api";
  let changeableUrl = url;
  if(country){
    changeableUrl = `${url}/countries/${country}`;
  }
  const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
  return ({
  confirm: confirmed.value,
  recover: recovered.value,
  death: deaths.value,
  update: lastUpdate
});
}

useEffect(()=>{
  const fetchAPI = async() =>{
    setLatest(await fetchData())
  }
  fetchAPI();

},[setLatest])

const handleCountryChange = async (country) =>{
  setCountry({country:country})
  const fetchedData = await fetchData(country);
  setLatest(fetchedData);

}

  return (
  <div className={styles.container}>
  <img className={styles.image} src={coronaImage} alt="COVID-19" />
  <Cards confirmed= {latest.confirm} updated={latest.update} recovered={latest.recover} deaths={latest.death}/>
  <CountryPicker handleCountryChange={handleCountryChange}/>
  <Chart country={country} confirmed= {latest.confirm} recovered={latest.recover} deaths={latest.death}/>
  </div>
)


}


export default App;

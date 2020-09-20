import React ,{useEffect} from "react";
import {NativeSelect, FormControl} from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import axios from "axios";


function CountryPicker({handleCountryChange}){
  const fetchCountries = async ()=>{
    const {data: {countries}} = await axios.get("https://covid19.mathdro.id/api/countries");
    return countries.map((country)=> country.name)
  }
  const [fetchedCountries, setFetchedCountries] = React.useState([]);
  useEffect(()=>{
    const fetchAPI = async() => {
      setFetchedCountries(await fetchCountries())
    }
    fetchAPI();
  },[setFetchedCountries])

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
      <option value=""> Global </option>
      {fetchedCountries.map((country, i) => <option key={i} value={country}> {country} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;

import { useState } from "react";
import './SearchBox.css';
import Forecast from "./Forecast";
export default function SearchBox() {
    const [cityName, setCityName] = useState("");
    const [forecasts, setForecasts] = useState([]);
    const handleKeyDown = async (event) => {
        if(event.key==='Enter' && cityName.trim().length >2){
            const URL= "https://api.weatherapi.com/v1/forecast.json?key=88f76b24d02e462cb7b42856231606&q="+cityName+"&days=3&aqi=no&alerts=no";
            try{
                const response = await fetch(URL, {method:"GET", headers: {Accept: 'application/json'}});
                if(!response.ok){
                    throw new Error(`Error failed to send an HTTP GET Request: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.forecast.forecastday);
                setForecasts(data.forecast.forecastday);
            }catch(err){
                console.error(err)
            }
        }
    }

    function handleChange(event){
        setCityName(event.target.value);
    }
return(
<>
      <div>
            <input type="text"
                className="searchBox"
                placeholder="Enter City name"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <h3>weather for {cityName}</h3>
            <ul>
                {forecasts.map(function (forecast, i) {
                    return (
                        // <li key={i}>
                        // <span>{forecast.date}</span>
                        // { <span>{forecast.day.maxtemp_c}</span> }
                        // </li>

                        <Forecast key={i} props={forecast} />
                    )
                })
            }
            </ul>
        </div>
</>
)


}
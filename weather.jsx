import "./Weather.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
export default function WeatherApp(){
    const[data,setData]=useState("");
    const[showdata,setShowdata]=useState(null);
    const API_NAME="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY="b1aae30b272e204c5371d279898d1322";
 
    let getapi=async()=>{
        let response=await fetch(`${API_NAME}?q=${data}&appid=${API_KEY}&units=metric`)
        let jsonrespose=await response.json();
        console.log(jsonrespose);
        let my={temp_min:jsonrespose.main.temp_max,
                temp_max:jsonrespose.main.temp_min,
                city_name:jsonrespose.name,
                wind_speed:jsonrespose.wind.speed
        }
        setShowdata(my);
    }
    let Handlechange=(e)=>{
         setData(e.target.value);
    }
    let Handleclick=(e)=>{
         e.preventDefault();
        console.log(data);
        setData("")
        getapi();
    }
    return(<>
    <div className="heading">
    <h1 style={{fontWeight:"bold"}}>Search for weather</h1>
    <form className="flex  flex-row gap-2 mt-6" onSubmit={Handleclick}>
    <span> 
         <TextField id="outlined-basic" label="City-Name" variant="outlined" required value={data} onChange={Handlechange}/>
     </span>
    <span>
        <Button variant="contained" type="submit" className="h-14" onClick={Handleclick}>Search</Button>
    </span>
    </form>
    <p>{showdata &&(<div>
    <h2 style={{fontWeight:"bold"}}>City: {showdata.city_name}</h2>
    <p style={{color:"blue"}}>Min Temp: {showdata.temp_min}°C</p>
    <p style={{color:"red"}}>Max Temp: {showdata.temp_max}°C</p>
    <p style={{color:"green"}}>Wind Speed: {showdata.wind_speed}M/S</p>
  </div>)}</p>
    </div>
    </>)
}
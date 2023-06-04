import axios from "axios";


export const getPlacesData = async (type, sw,ne) =>{
    try{
                                                  
        const { data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    }
    catch(e){
        console.log(e);
    }
}

export const getWeatherData =  async (lat,lng) =>{
  try{
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY}`)
    return data;
  }
  catch(e){
    console.log(e);
  }
}
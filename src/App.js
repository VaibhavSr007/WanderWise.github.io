import React, { useEffect, useState } from 'react';
import {CssBaseline, Grid}  from '@material-ui/core';
import { Header } from './components/Header/Header';
import { List } from './components/List/List';
import { Map } from './components/Map/Map';
import { getPlacesData } from './api';
import { getWeatherData } from './api';


function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([])

  useEffect(() =>{  // this use effect invoked when map is loaded for first time (it sets the location to users current location)
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) =>{
      setCoordinates({lat: latitude, lng: longitude});
    })
},[])

  useEffect(() =>{  // this use effect invoked when we change the cordiantes in map
    // console.log(coordinates,bounds);
    if(bounds.sw && bounds.ne){
        setIsLoading(true);

        getWeatherData(coordinates.lat,coordinates.lng)
        .then((data) => setWeatherData(data));
        // console.log(weatherData)
        getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) =>{
            console.log(data);
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
          })
      }
  },[type, bounds])
    

  useEffect( () =>{
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  },[rating])
  return (
    <>
       <CssBaseline/>
       <Header setCordinates={setCoordinates}/>
       <Grid container spacing={3} style={{width: '100%'}}>
          <Grid item xs={12} md={4}>
              <List 
                  places = {filteredPlaces.length ? filteredPlaces : places}
                  childClicked = {childClicked}
                  isLoading = {isLoading}
                  setType = {setType}
                  type = {type}
                  rating = {rating}
                  setRating = {setRating}

              />
          </Grid>
          <Grid item xs={12} md={8}>
              <Map
                setCoordinates = {setCoordinates}
                setBounds = {setBounds}
                coordinates = {coordinates}
                places = {filteredPlaces.length ? filteredPlaces : places}
                setChildClicked={setChildClicked}
                weatherData = {weatherData}
              />
          </Grid>
       </Grid>
       {/* <script src= 'https://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyA-ZxRwOO-v-axP7W4KqIBglgT9hOiFAco&parameters'></script>
       <iframe
          width="600"
          height="450"
          style="border:0"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA-ZxRwOO-v-axP7W4KqIBglgT9hOiFAco&q=Space+Needle,Seattle+WA">
      </iframe> */}
    </>
  );
}

export default App;

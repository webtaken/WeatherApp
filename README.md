# Weathlify

## Introduction

Weathlify is an App for weather that gives you some recommendations, its basic features are **geolocalization** of a place around the world (you search by specific name) or your current location, **weather metrics** for the place you search and the last one is **recommendations** for the day based on that metrics such as wearing a coat or scarf if temperature is very cold for example. You can see a demo in the following link: [DEMO](https://weathlify-app.netlify.app/).

## Technologies

### Frontend

![Frame 16.png](WeathlifyDocs/Frame_16.png)

In the Frontend the main technologies used were **[ReactJS](https://reactjs.org/)** and **[MaterializeCSS](https://materializecss.com/)**, I separate the components of the app in two main features: **GeoManager & WeatherManager**, important aspect in the app is _latitude_ and _longitude_ of the current region been analyzed.

### Backend

![Frame 17.png](WeathlifyDocs/Frame_17.png)

In the backend I used [**NodeJS**](https://nodejs.org/) and [**ExpressJS**](https://expressjs.com/) for server fast build, on the backend I realize HTTP calls for the APIs used here, this was designed in that way because I need to protect the _API keys_ provided by such APIs.

### APIs

![Frame 18.png](WeathlifyDocs/Frame_18.png)

The two APIs used here are [**Geocoding API**](https://developers.google.com/maps/documentation/geocoding/overview) from Google and **[Weatherbit.io](https://www.weatherbit.io/)** for the weather metrics.

Geocoding API lets you find exact latitude and longitude of a given address you give to the API, with that functionality I was able to go represent that place in a map.

Weatherbit.io is a free weather API that gives you weather metrics such as temperature, atmospheric pressure, wind speed and direction, relative humidity, etc. given a latitude and longitude data you can retrieve all that metrics, with that metrics I designed an algorithm to give you some recommendations before you go outside your home basde on the current weather metrics.

### Additional Libraries

![Frame 19 (1).png](<WeathlifyDocs/Frame_19_(1).png>)

To show a place in a map I used **[ReactLeaflet](https://react-leaflet.js.org/)** library that adapts popular javascript maps library **[Leaflet](https://leafletjs.com/)** to React. For the HTTP requests I used **[AxiosJS](https://axios-http.com/)** and **[FetchAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)**, specifically on the frontend I make fetch api calls because is built in, and on the backend I use Axios because is more easy to use.

## Structure and compilation

The project is divided into two folders `weather/`is the folder that host the frontend, `weather_server/`is the folder for the backend.

### Backend compilation

To compile the backend just enter to the `weather_server/` folder and on the terminal type `npm start` and this will start the local backend server.

### Frontend compilation

To compile the frontend just enter `weather/` folder and on the terminal type `npm start` this will start the development server, go to [http://localhost:3000](http://localhost:3000) and enjoy the app, for building a production ready solution type `npm build`.

## Features

Three are the main features of the app: Geolocation feature, Wheater Metrics feature and Wheater Recommendations feature.

### Geolocation

This feature is very simple, you have a search bar on top, where you can search a place by its specific address (this text can be very general), e.g. for Empire State you can type **_Empire State, New York City, United States_** or **_empire state, EEUU new York_** simple as that, then the app will travel you in the map to the searched place, below you’ll see an example.

[geolocation.mp4](WeathlifyDocs/geolocation.mp4)

### Weather Metrics

This feature gives you important metrics about the weather such as temperature, UV index, atmospheric pressure, etc. you’ll see below an example of the weather metrics around the empire state in new york city.

[weather_metrics.mp4](WeathlifyDocs/weather_metrics.mp4)

### Weather Recommendations

This feature give you some usefull recommendations based on the weather metrics, such as using a scarf and a coat if the temperature is very cold, or alerting you of fogs if visibility is too short in your zone, below are the recommendations for empire state zone.

[weather_recommendations.mp4](WeathlifyDocs/weather_recommendations.mp4)

## Future Work

For the next part I would like to implement a whatsapp bot that gives you some advice about your current weather, it will be a great opportunity to use the whatsapp cloud API to code this.

## Acknowledgements

Special thanks to me for learning as much as possible every day and the university for the cool library and the free wifi ;).

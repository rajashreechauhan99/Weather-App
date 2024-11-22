const inputBox =document.querySelector('.input-box');
const searchBtn =document.getElementById('searchBtn');
const weather_img =document.querySelector('.weather_img');
const temperature =document.querySelector('.temperature');//Api through temp lane wale hein
const description =document.querySelector('.description');
const humidity =document.getElementById('humidity');
const wind_speed =document.getElementById('wind-speed');
const location_not_found =document.querySelector('location-not-found');
const weather_body =document.querySelector('weather-body');



//openweathermap web-app pe account bana lena,aur waha se API le lena
//await humesha async function pr lagate hein
async function checkWeather(city){

const api_key="66028b869dec0d4e2862477fe93a69ea";
const url ="https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}";
// const url ="https://api.openweathermap.org/data/2.5/weather?q=${city}";


//response.json apne ko jo data fetch() ne response ne lakr diya hein usko wo string mein convert kr dega
const weather_data =await fetch(`${url}`).then(response =>
// const weather_data =await fetch(url+`&appid=${api_key}`).then(response =>
    response.json());

    if(weather_data.cod === '404'){

        location_not_found.style.display ="flex";
        weather_body.style.display ="none";
        console.log("error");
        return;
    }

    location_not_found.style.display="none";
    weather_body.style.display= "flex";
    console.log(weather_data);
    //value roundoff krne keliye function use kiya hei 
    temperature.innerHTML=`${Math.round(weather_data.main.temp - 279.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Km/hr`;


    //ye hein img show krne kiye
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src="./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src="./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src="./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src="./assets/snow.png";
            break;
    }

}

searchBtn.addEventListener("click",()=>{
    checkWeather(inputBox.value); 
});
const cityInput = document.querySelector('input');
const formDiv = document.querySelector('.name-form');


const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click',()=>{
    let cityName = cityInput.value
    getWeather(cityName);
})


function getWeather(cityName){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0ca4e0d3541309da22200a374c79b9eb`;
    fetch(url, {mode: 'cors'})
    .then((response)=>{
        return response.json();
    })
    .then((weatherJson)=>{
        console.log(weatherJson);
        showWeather(weatherJson);
    })
}


function showWeather(weatherJson){
    if(document.body.querySelector('.weather-div')){
        document.body.querySelector('.weather-div').remove();
    }

    let desc = String(weatherJson.weather[0].description);
    let cityName = String(weatherJson.name);
    let humidity = String(weatherJson.main.humidity);
    let currentTempC = String(weatherJson.main.temp);
    let maxTempC = String(weatherJson.main.temp_max);
    let minTempC = String(weatherJson.main.temp_min);
    let wIcon = String(weatherJson.weather[0].icon);
    let country = String(weatherJson.sys.country);

    if(formDiv.classList.contains('hidden-div')){
        formDiv.classList.toggle('hidden-div');
    }
    else{
        formDiv.classList.add('hidden-div');
    }
    
    let weatherDiv = getWeatherDiv(desc, cityName, humidity, currentTempC, maxTempC, minTempC, wIcon, country);

    document.body.append(weatherDiv);
}


function getWeatherDiv(desc, cityName, humidity, currentTemp, maxTemp, minTemp, wIcon, country){
    let weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather-div');


    let cityNameH = document.createElement('h1');
    cityNameH.textContent = `${cityName}, ${country}`;

    let humidityP = document.createElement('p');
    humidityP.textContent = `Humidity: ${humidity}%`;
    humidityP.style.cssText = 'grid-area: humidity';

    let descDiv = document.createElement('div');
    descDiv.classList.add('desc-div');
    let descP = document.createElement('p');
    descP.textContent = desc;
    let weatherIcon = new Image();
    weatherIcon.src = `http://openweathermap.org/img/wn/${wIcon}@2x.png`
    weatherIcon.style.cssText = 'width: 100px; height: auto';
    descDiv.append(descP, weatherIcon);

    let tempDiv = document.createElement('div');
    tempDiv.classList.add('temp-div');
    let currentTempP = document.createElement('p');
    currentTempP.textContent = `Current Temp. : ${currentTemp}C`;

    let maxTempP = document.createElement('p');
    maxTempP.textContent = `Max Temp. : ${maxTemp}C`;

    let minTempP = document.createElement('p');
    minTempP.textContent = `Min Temp. : ${minTemp}C`;
    tempDiv.append(currentTempP, maxTempP, minTempP);

    weatherDiv.append(cityNameH, descDiv, tempDiv, humidityP);
    return weatherDiv;
}
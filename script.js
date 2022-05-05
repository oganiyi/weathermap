function dateAndTime(){
    let d = new Date();

    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    let day = d.getDay();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let seconds = d.getSeconds();
    let timeMeridian;

    if(hour > 12){
        hour -= 12;
        timeMeridian = "PM";
    }
    else{
        timeMeridian = "AM";
    }
    
    let arrofDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let arrofMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let currentDateAndTime = document.getElementById('weatherDate');
    currentDateAndTime.innerHTML = `${arrofDay[day]}, ${arrofMonth[month]} ${date}, ${year}. ${hour}:${minute}:${seconds}${timeMeridian}`
}

dateAndTime();
setInterval(dateAndTime, 1000);


async function weatherAPI(input){
    let apiKey = "6dd490cc75a10b580348f58a4e8337ab";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    let city = document.querySelector('#city');
    city.innerHTML = '';
    let country = document.querySelector('#country');
    country.innerHTML = '';
    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = '';
    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = '';
    let weatherDescription = document.querySelector('#weatherDescription');
    weatherDescription.innerHTML = '';
    let coordinate = document.querySelector('#coordinate');
    coordinate.innerHTML = '';

    for(let key in data){
        if(key == 'cod'){
            document.querySelector('#notFound').innerHTML = data['message'];
        }

        if(key == 'name'){
            city.innerHTML = data[key];            
        }
        if(key == 'sys'){
            country.innerHTML = data[key].country;
        }
        if(key == 'main'){
            temperature.innerHTML = `${data[key].temp}<sup>o</sup>C`;
            feelsLike.innerHTML += `Feels like ${data[key].feels_like}<sup>o</sup>C`;
        }
        if(key == 'weather'){
            weatherDescription.innerHTML = data[key][0].description;
        }
        if(key == 'coord'){
            coordinate.innerHTML += `<li>Longitude: ${data[key].lon}</li><li>Latitude: ${data[key].lat}</li>`
        }
        if(data['message']){
            document.querySelector('#notFound').style.display = 'block';
            document.querySelector('#mainContent').style.display = 'none';
        }
        else{
            document.querySelector('#mainContent').style.display = 'block';
            document.querySelector('#notFound').style.display = 'none';
        }
    }
}

let cityInput = document.forms['weatherFrm']['inputCity'];

document.forms['weatherFrm'].addEventListener('submit', (e)=>{
    e.preventDefault();
    weatherAPI(cityInput.value);
})
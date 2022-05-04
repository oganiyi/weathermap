async function weatherAPI(input){
    let apiKey = "6dd490cc75a10b580348f58a4e8337ab";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;

    const response = await fetch(apiURL);
    const data = await response.json();

    let city = document.querySelector('#city');
    let country = document.querySelector('#country');
    let temperature = document.querySelector('#temperature');
    let feelsLike = document.querySelector('#feelsLike');
    let weatherDescription = document.querySelector('#weatherDescription');
    let coordinate = document.querySelector('#coordinate');

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
            feelsLike.innerHTML += `${data[key].feels_like}<sup>o</sup>C`;
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

let d = new Date();
let weatherDate = document.getElementById('weatherDate');

document.forms['weatherFrm'].addEventListener('submit', (e)=>{
    e.preventDefault();
    weatherDate.innerHTML = d.toString();
    document.querySelector('.alert').innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>        
    Kindly refresh to search for another city.`;
    weatherAPI(cityInput.value);
})
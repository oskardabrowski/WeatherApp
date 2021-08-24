import name from './names';
import CityWeather from './CityWeather';
import DayWeather from './DayWeather';
import * as api from './api';
import * as loader from './loader';

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('city')) {
        const city = localStorage.getItem('city');
        name.inputCityName.value = city;
        printWeather(city);
    }
    name.SearchWeatherFor.addEventListener('click', async function(e) {
        e.preventDefault();
        const city = name.inputCityName.value;
        localStorage.setItem('city', city);
        printWeather(city);
    })

    async function printWeather(city) {
        loader.startLoader();
        const data = await fetch(`${api.apiday}?q=${city}&lang=${api.lang}&appid=${api.key}`);
        const parsedData = await data.json();
        const data7 = await fetch(`${api.api7}?q=${city}&lang=${api.lang}&appid=${api.key}`);
        const parsedData7 = await data7.json();
        const forecast7 = parsedData7.list;
        loader.stopLoader();
        const weather = new CityWeather(parsedData.weather[0].id, parsedData.weather[0].description, parsedData.main.temp, parsedData.main.feels_like, parsedData.main.pressure, parsedData.main.humidity, parsedData.wind.speed);
        const today = new Date();
        const date = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();
        const day = today.getDay();
        let fullDay;
        const hours = today.getHours();
        console.log(hours)
        const temp = weather.temperature - 273.15;
        const feel = weather.feels - 273.15;
        const capitalize = (str) => {
            if(typeof str === 'string') {
                return str.replace(/^\w/, c => c.toUpperCase());
            } else {
                return '';
            }
        };
        switch(day) {
            case 0:
                fullDay = "Niedziela";
            break;
            case 1:
                fullDay = "Poniedziałek";
            break;
            case 2:
                fullDay = "Wtorek";
            break;
            case 3:
                fullDay = "Środa";
            break;
            case 4:
                fullDay = "Czwartek";
            break;
            case 5:
                fullDay = "Piątek";
            break;
            case 6:
                fullDay = "Sobota";
            break;
        }
        async function printData() {
            let forecast = '';
            for(var i = 0; i < 40; i++) {
                const data = new DayWeather(forecast7[i].weather[0].id, forecast7[i].weather[0].description, forecast7[i].main.temp, forecast7[i].dt_txt);
                const temp = data.temperature - 273.15;
                const dt = data.date.split(" ");
                const dt2 = dt[1].split(":");
                const hours = dt2[0];
                const mark =`<div class="search-body-container-next-day">
                    <div>
                        <svg>
                            <use xlink:href="${data.findIco(hours)}"></use>
                        </svg>
                        <p>${data.date}</p>
                        <p>${capitalize(data.description)}</p>
                        <p>${temp.toFixed(1)}°C</p>
                    </div>
                </div>`;
                forecast += mark;
            }
            name.next.innerHTML = forecast;
        }
        printData();

        const todayMarkup = `<div class="search-body-container-today-generalData">
            <div class="search-body-container-today-generalData-date">${fullDay} ${date}.${month+1}.${year}</div>
            <div class="icoAndTemp">
                <svg>
                    <use xlink:href="${weather.findIco(hours)}"></use>
                </svg>
                <div>
                    <div class="todaysTemperature">${temp.toFixed(1)}°C</div>
                    <div class="todaysWeather">${capitalize(weather.description)}</div>
                </div>
            </div>
        </div>
        <div class="search-body-container-today-additionalData">
            <div>
                <div>
                    <div class="feelTemperature">${feel.toFixed(1)}°C</div>
                    <div>Temperatura odczuwalna</div>
                </div>
            </div>
            <div>
                <div>
                    <div class="presureHpa">${weather.pressure} hPa</div>
                    <div>Ciśnienie</div>
                </div>
            </div>
            <div>
                <div>
                    <div class="windSpeed">${weather.windSpeed} km/h</div>
                    <div>Prędkość wiatru</div>
                </div>
            </div>
            <div>
                <div>
                    <div class="humidityPercent">${weather.humidity}%</div>
                    <div>Wilgotność</div>
                </div>
            </div>
        </div>`;
        name.todayWeatherContainer.innerHTML = todayMarkup;
    }
})
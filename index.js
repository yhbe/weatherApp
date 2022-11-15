async function getWeatherData(str) {
  const errorMessage = document.querySelector('form + span');

  let location = str[0];
  let state = str[1];
  let country = str[2];

  try {
    if (country === undefined && state === undefined) {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data), errorMessage.classList.add('hidden');
    }
    if (country === undefined) {
      country = state;
      state = '';
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location},${country}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data), errorMessage.classList.add('hidden');
    } else {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location},${state},${country}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data), errorMessage.classList.add('hidden');
    }
  } catch {
    errorMessage.classList.remove('hidden');
  }
}

function displayWeather(data) {
  const weather = document.querySelector('.weather');
  const city = document.querySelector('.city');
  const temperature = document.querySelector('.temperature');
  const emojiWeatherIcon = document.querySelector('.emoji-of-weather');

  weather.innerHTML = data.weather[0].description;
  city.innerHTML = data.name;
  temperature.innerHTML = convertKelvin(data);
  emojiWeatherIcon.innerHTML = handleWeatherIcon(data);
}

function convertKelvin(data) {
  let convertedToF = 1.8 * (data.main.temp - 273) + 32;
  return `${Math.round(convertedToF)}&#8457`;
}

function handleWeatherIcon(data) {
  if (data.weather[0].main === 'Rain') {
    return '🌧';
  }
  if (data.weather[0].main === 'Drizzle') {
    return '🌧';
  }
  if (data.weather[0].main === 'Thunderstorm') {
    return '⛈️';
  }
  if (data.weather[0].main === 'Clear') {
    return '🌞';
  }
  if (data.weather[0].main === 'Clouds') {
    return '☁️';
  }
  if (data.weather[0].main === 'Snow') {
    return '🌨';
  } else return '🌫️';
}

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.querySelector('form > input');
  let str = input.value.split(',');
  getWeatherData(str);
  form.reset();
});

getWeatherData(['london']);

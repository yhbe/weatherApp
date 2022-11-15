async function getWeatherData(str) {
  let location = str[0];
  let state = str[1];
  let country = str[2];
  try {
    if (country === undefined && state === undefined) {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data);
    }
    if (country === undefined) {
      country = state;
      state = '';
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location},${country}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data);
    } else {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location},${state},${country}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
      );
      const data = await response.json();
      return displayWeather(data);
    }
  } catch {
    console.log('that didnt work...err');
  }
}

function displayWeather(data) {
  console.log(data, data.name, data.sys.country);
}

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.querySelector('form > input');
  let str = input.value.split(',');
  getWeatherData(str);
});

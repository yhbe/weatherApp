async function getWeatherData(location, state, country) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location},${state},${country}&APPID=7a12fe1d21939af0deb6d706dcb169ec`
  );
  const data = await response.json();
  return displayWeather(data);
}

function displayWeather(data) {
  console.log(data, data.name, data.sys.country);
}

getWeatherData('Baghdad', '', 'Iraq');

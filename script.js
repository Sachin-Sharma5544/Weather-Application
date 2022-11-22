const cityName = document.querySelector(".city-name");
const API_key = "8d86d7c63d6b5ff4900438e1d3c71f85";
//const city = cityName.value;
const city = `Mumbai`;
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`;
//const url2 = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

// fetch(url)
//     .then((response) => {
//         //console.log(response.json());
//         return response.json();
//     })
//     .then((data) => {
//         // console.log(data);
//         // let { lat, lon } = data[0];
//         // console.log(lat);
//         // console.log(lon);
//         return data;
//     })
//     .then((data) => {
//         fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_key}`
//         )
//             .then((newResponse) => {
//                 return newResponse.json();
//             })
//             .then((newData) => {
//                 console.log(newData.main.humidity);
//             });
//     });

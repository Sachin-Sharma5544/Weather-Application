const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const incorrErrorMsg =
    "Bhai Kya kar raha hai tu, Sahi value to daal de yaar jisme sirf alpha char ho";
const blankErrorMsg = "Bhai itna aalas sahi nahi, kuch to value daal de please";
const invalidCityName =
    "ERROR!!!! Ye koi city ka naam nahi hai be, city ka sahi naam to daal";

const webAPI = {
    API_Key: "8d86d7c63d6b5ff4900438e1d3c71f85",
    Units: "metric",
    Base_Url: "https://api.openweathermap.org/data/2.5/weather?",
};

const hourVal = querySelectorFun(".hour-value");
const minVal = querySelectorFun(".min-value");
const secVal = querySelectorFun(".sec-value");

const date = querySelectorFun(".date");
const month = querySelectorFun(".month");
const year = querySelectorFun(".year");

const tempVal = querySelectorFun(".temp-val");
const humdVal = querySelectorFun(".humd-val");
const pressureVal = querySelectorFun(".pressure");
const countryVal = querySelectorFun(".country");
const error = querySelectorFun(".error");

const getInfoBtn = querySelectorFun(".get-button button");
const cityName = querySelectorFun(".city-name");

//Display Date and Time
getDateValues();
setTimeValues(getTimeValues().hour, getTimeValues().min, getTimeValues().sec);
setDateValues(
    getDateValues().dateVal,
    months[getDateValues().monthVal],
    getDateValues().yearVal
);

setInterval(function () {
    setDateValues(
        getDateValues().dateVal,
        months[getDateValues().monthVal],
        getDateValues().yearVal
    );
    setTimeValues(
        getTimeValues().hour,
        getTimeValues().min,
        getTimeValues().sec
    );
}, 1000);

//Event Listners

getInfoBtn.addEventListener("click", function () {
    const city = cityName.value;
    let weatherData;
    if (checkPattern(city)) {
        weatherData = getWeatherData(city);
    }
    weatherData
        .then((data) => {
            console.log(data);
            if (data.cod >= 200 && data.cod <= 299) {
                tempVal.innerHTML = `${data.main.temp} &deg;C`;
                humdVal.innerHTML = `${data.main.humidity} gm/m<sup>3</sup>`;
                countryVal.innerHTML = `${data.sys.country}`;
                pressureVal.innerHTML = `${data.main.pressure}`;
                error.innerHTML = "";
            } else {
                tempVal.innerHTML = ``;
                humdVal.innerHTML = ``;
                countryVal.innerHTML = ``;
                pressureVal.innerHTML = ``;
                error.innerHTML = invalidCityName;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

//Functions statements/ Declarations

//API Functions

function getWeatherData(city) {
    let url = `${webAPI.Base_Url}q=${city}&appid=${webAPI.API_Key}&units=${webAPI.Units}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            });
    });
}

//Pattern validation function

function checkPattern(city) {
    let pattern = /^[a-zA-Z\s]*$/;

    if (pattern.test(city) && city == "") {
        alert(blankErrorMsg);
    } else if (!pattern.test(city) && city != "") {
        alert(incorrErrorMsg);
    } else if (pattern.test(city) && city != "") {
        return true;
    }
}

//Date and Time function statements
function getTimeValues() {
    const currDate = new Date();
    const hour =
        currDate.getHours() < 10
            ? `0${currDate.getHours()}`
            : currDate.getHours();
    const min =
        currDate.getMinutes() < 10
            ? `0${currDate.getMinutes()}`
            : currDate.getMinutes();
    const sec =
        currDate.getSeconds() < 10
            ? `0${currDate.getSeconds()}`
            : currDate.getSeconds();

    return {
        hour: hour,
        min: min,
        sec: sec,
    };
}

function getDateValues() {
    const currDate = new Date();

    return {
        dateVal: currDate.getDate(),
        monthVal: currDate.getMonth(),
        yearVal: currDate.getFullYear(),
    };
}

function setTimeValues(hour, min, seconds) {
    hourVal.textContent = hour;
    minVal.textContent = min;
    secVal.textContent = seconds;
}

function setDateValues(dateVal, monthVal, yearVal) {
    date.textContent = dateVal;
    month.textContent = monthVal;
    year.textContent = yearVal;
}

//Selector functions

function querySelectorFun(selVal) {
    return document.querySelector(`${selVal}`);
}

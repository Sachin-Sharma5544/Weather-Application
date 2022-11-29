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

// make an errorMsg Object
const errorMsgCity = {
    incorrErrorMsg:
        "ERROR!!! You may have entered characters other than alphabets in the City Name which is not correct.",
    blankErrorMsg:
        "ERROR!!! City Name field is blank, please enter a valid City Name.",
    invalidCityName:
        "ERROR!!! It's not a valid city, please enter a valid City Name.",
};

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

const getInfoBtn = querySelectorFun(".get-button");
const cityName = querySelectorFun(".city-name");
const cityVal = querySelectorFun(".city");
const clearBtn = querySelectorFun(".clear-button");

//Display Date and Time
//getDateValues();
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

    //TODO: This is an error as for calls where city name is empty, checkpattern(city) ->false
    // -> weatherData (undefied) which gives error for attaching then

    weatherData
        .then((data) => {
            // console.log(data);
            if (data.cod >= 200 && data.cod <= 299) {
                tempVal.innerHTML = `${data.main.temp} &deg;C`;
                humdVal.innerHTML = `${data.main.humidity} gm/m<sup>3</sup>`;
                countryVal.innerHTML = `${data.sys.country}`;
                pressureVal.innerHTML = `${data.main.pressure} millibars`;
                cityVal.innerHTML = `${data.name}`;
                error.innerHTML = ``;
            } else {
                tempVal.innerHTML = ``;
                humdVal.innerHTML = ``;
                countryVal.innerHTML = ``;
                pressureVal.innerHTML = ``;
                cityVal.innerHTML = ``;
                error.innerHTML = errorMsgCity.invalidCityName;
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

clearBtn.addEventListener("click", function () {
    cityName.value = ``;
    tempVal.innerHTML = ``;
    humdVal.innerHTML = ``;
    countryVal.innerHTML = ``;
    pressureVal.innerHTML = ``;
    cityVal.innerHTML = ``;
    error.innerHTML = ``;
});

//Functions statements/ Declarations

//API Functions

function getWeatherData(city) {
    let url = `${webAPI.Base_Url}q=${city}&appid=${webAPI.API_Key}&units=${webAPI.Units}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                resolve(data);
            });
    });

    //return fetch(url).then((response) => response.json());
}

//Pattern validation function

function checkPattern(city) {
    let pattern = /^[a-zA-Z\s]{1,}/;
    console.log(pattern.test(city));

    if (pattern.test(city) && city == "") {
        error.innerHTML = errorMsgCity.blankErrorMsg;
        return false;
    } else if (!pattern.test(city) && city != "") {
        error.innerHTML = errorMsgCity.incorrErrorMsg;
        return false;
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

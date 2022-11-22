let months = [
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

const hourVal = document.querySelector(".hour-value");
const minVal = document.querySelector(".min-value");
const secVal = document.querySelector(".sec-value");

const date = document.querySelector(".date");
const month = document.querySelector(".month");
const year = document.querySelector(".year");

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

//functions statements/ Declarations

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

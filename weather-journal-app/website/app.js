/* Global Variables */
//base Url for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
//Personal API key for OpenWeatherMap API
const API_Key = '640ae9f372bc7623e01ead6b4adc4f16';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", displayInfo);



/* Function called by event listener */
function displayInfo() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    //alert when zip code is not a number or if its not of length 5
    if (zipCode.length != 5 || !zipCode.isInteger()) {
        alert('Invalid Zip Code, Code must be exactly 5 numbers!');
    }

    get_WebAPI_Data(baseUrl, zipCode, API_Key).then(function(data) {
        postData('/weatherData', {
            temperature: data.main.temp,
            date: newDate,
            userResponse: feelings,
        });
    }).then(() => get_Project_Data('/all'));

}

/* Function to GET Web API Data*/
const get_WebAPI_Data = async(baseURL, zipCode, key) => {

    const request = await fetch(baseURL + zipCode + '&APPID=' + key + '&units=metric');
    try {

        const data = await request.json();
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
//then update the inner html of the DOM elements that will show the data
const get_Project_Data = async(url = '') => {
    const request = await fetch(url);
    try {
        const data = await request.json();
        console.log('Most Recent Data '.data);
        document.getElementById("date").innerHTML = `Date: ${data.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${data.temperature}°C`;
        document.getElementById("content").innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
};
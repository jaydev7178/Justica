const URL="http://localhost:8081/api/"; 

const token = localStorage.getItem('token');
        //console.log('token is '+token);
        if(!token)
        {
            window.location.href = "login.html";
            document.getElementById("login-error-msg").innerHTML('Session expired, Please login again.');
            document.getElementById("login-error-msg").hidden=false;
        }

const ProfileHomelawyerName = document.getElementById("profile-home-lawyerName");
const ProfileHomeEmail= document.getElementById("profile-home-email");
const ProfileHomeMobile= document.getElementById("profile-home-mobile");
const ProfileHomeEexperience= document.getElementById("profile-home-experience");
const ProfileHomedob= document.getElementById("profile-home-dob");
const ProfileHomeLicenseNo= document.getElementById("profile-home-licenseNo");
const ProfileHomeAddress= document.getElementById("profile-home-address");
const ProfileHomeCity= document.getElementById("profile-home-city");
const ProfileHomeState= document.getElementById("profile-home-state");
const ProfileHomeCountry= document.getElementById("profile-home-country");

ProfileHomelawyerName.innerHTML=localStorage.getItem('name');
 ProfileHomeEmail.innerHTML=localStorage.getItem('email');
 ProfileHomeMobile.innerHTML=localStorage.getItem('mobile');
 ProfileHomeEexperience.innerHTML=localStorage.getItem('experience');
 ProfileHomedob.innerHTML=localStorage.getItem('dob');
 ProfileHomeLicenseNo.innerHTML=localStorage.getItem('licenseNo');
 ProfileHomeAddress.innerHTML=localStorage.getItem('address');
// ProfileHomeCity.innerHTML=localStorage.getItem('city');
// ProfileHomeState.innerHTML=localStorage.getItem('state');
// ProfileHomeCountry.innerHTML=localStorage.getItem('country');

const loginErrorMsg = document.getElementById("profile-view-logout");
var cityId=localStorage.getItem('cityId');
var stateId=localStorage.getItem('stateId');
var countryId=localStorage.getItem('countryId');
console.log(URL);

fetch(URL + 'city/getCityList', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:cityId})
}).then((response) => response.json())
// Then with the data from the response in JSON....then((data) => {
    .then((cityData) => {
    //console.log('Success:', data);
    console.log('Success:', cityData.obj);
    //data.obj;
    if (cityData.code == "200") {
        console.log(cityData.obj.stateId);
        ProfileHomeCity.innerHTML=cityData.obj.name;
        
        fetch(URL + 'state/getStateList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:cityData.obj.stateId})
        }).then((response) => response.json())
        // Then with the data from the response in JSON....then((data) => {
            .then((StateData) => {
            //console.log('Success:', data);
            console.log('Success:', StateData.obj);
            //data.obj;
            if (StateData.code == "200") {
                console.log(StateData.obj.name);
                ProfileHomeState.innerHTML=StateData.obj.name;
                fetch(URL + 'country/getCountryById', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id:StateData.obj.countryId})
                }).then((response) => response.json())
                // Then with the countryData from the response in JSON....then((countryData) => {
                    .then((countryData) => {
                    //console.log('Success:', countryData);
                    console.log('Success:', countryData.obj);
                    //countryData.obj;
                    if (countryData.code == "200") {
                        console.log(countryData.obj.name);
                        ProfileHomeCountry.innerHTML=countryData.obj.name;
                        
                    } 
                    // RcountryData = countryData;
                });
            } 
            // Rdata = data;
        });
        
    } 
    // Rdata = data;
});


fetch(URL + 'country/getCountryById', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:countryId})
}).then((response) => response.json())
// Then with the countryData from the response in JSON....then((countryData) => {
    .then((countryData) => {
    //console.log('Success:', countryData);
    console.log('Success:', countryData.obj);
    //countryData.obj;
    if (countryData.code == "200") {
        console.log(countryData.obj.name);
        ProfileHomeCity.innerHTML=countryData.obj.name;
        
    } 
    // RcountryData = countryData;
});


// require("./config.js");
// require("./apiCity.js");
// import URL from "./config.js";

// import getCitylist from "./apiCity.js";
// import {getCountrylist,getdata} from "./apiCountry.js";




const registrationForm= document.getElementById("registration-form");
const registrationButton = document.getElementById("registration-form-submit");
const registrationErrorMsg = document.getElementById("registration-error-msg");
const registrationFormSelectCountry = document.getElementById("registration-form-selectCountry");
const registrationFormSelectState = document.getElementById("registration-form-selectState");
const registrationFormSelectCity = document.getElementById("registration-form-selectCity");

//var data=getCountrylist();
var data=getdata();

console.log('list is',data);
var html = '';

// for (var i = 0; i < data.length; i++) {
// html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
// }
// registrationFormSelectCountry.innerHTML=html;


registrationFormSelectCountry.addEventListener("click",(e)=>{
    console.log('click in country');
    var selectedvalue= registrationFormSelectCountry.value;
    if(selectedvalue=='None')
    {
        registrationErrorMsg.innerHTML="Please select Country.";
        registrationErrorMsg.hidden=false;
    }else
    {
        var list=getCitylist(registrationFormSelectCountry);
        if(string.startsWith(list,'Error:'))
        {
            registrationErrorMsg.innerHTML=list;
            registrationErrorMsg.hidden=false;
        }else
        {
            if(list.code=="200")
            {
                var html = '';
                
                for (var i = 0; i < json.length; i++) {
                html += '<option>' + list.obj[i].name + '</option>';
                }
                registrationFormSelectCountry.innerHTML=html;
            }else{
                registrationErrorMsg.innerHTML=list.obj;
                registrationErrorMsg.hidden=false;
            }
        }
    }
})

//Registration API
registrationButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const varname = registrationForm.name.value;
    console.log(name);
    const varemail = registrationForm.email.value;
    const varmobile = registrationForm.mobile.value;
    const varpassword = registrationForm.password.value;
    const varlicenseNo = registrationForm.licenseNo.value;
    //const varaddress = registrationForm.address.value;
    const vardob = registrationForm.dob.value;

    const data = {
        email: varemail,
        name:varname,
        mobile: varmobile,
        password: varpassword,
        dob:vardob,
        experience:null,
        licenseNo:varlicenseNo,
        fees:null,
        image:null,
        address:'street',
        cityId:1
    
    };
    console.log(data);
    fetch(URL+'lawyer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
            //console.log('Success:', data);
            if(data.code=='201')
                {
                    console.log(data.obj);
                    registrationErrorMsg.innerHTML=data.obj;
                    registrationErrorMsg.hidden=false;

                }else if(data.code=='200')
                {
                    console.log(data.obj);
                    window.location.href = 'login.html';    
                    alert("You have Registered successfully.");
                }
            })
            //Then with the error genereted...
            .catch((error) => {
            console.error('Error:', error);
            });
    // if (varusername !=null && varpassword !=null) { // If the credentials are valid, show an alert box and reload the page
        
        
    //     //httpPost("https://localhost:44325/api/admin/login")
    //     //alert("You have successfully logged in.");
    //     //location.reload();
    // } else { // Otherwise, make the login error message show (change its oppacity)
    //     loginErrorMsg.style.opacity = 1;
    // }

    

})

/* #endregion */






var URL="http://localhost:8081/api/"; 



const registrationForm= document.getElementById("registration-form");
const registrationButton = document.getElementById("registration-form-submit");
const registrationErrorMsg = document.getElementById("registration-error-msg");


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




const token = localStorage.getItem('token');
        //console.log('token is '+token);
        if(!token)
        {
            window.location.href = "login.html";
            document.getElementById("login-error-msg").innerHTML('Session expired, Please login again.');
            document.getElementById("login-error-msg").hidden=false;
        }

        const updateProfileErrorMsg = document.getElementById("update-profile-error-msg");

        

        async function sendRequestWithToken(apiPath,data)
        {
            const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token':''+localStorage.getItem('token')+'',
                },
                body: JSON.stringify(data)
            });
        
            var data=reponse.json();
            return data;
            
        } 
        async function sendRequestWithOutToken(apiPath,data)
        {
            const reponse= await fetch("http://localhost:8081/api/"+apiPath,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            var data=reponse.json();
            return data;
            
        }


        const namev= document.getElementById("update-profile-name");        
        const emailv= document.getElementById("update-profile-email");        
        const mobilev= document.getElementById("update-profile-mobile");        
        const experiencev= document.getElementById("update-profile-experience");        
        const dobv= document.getElementById("update-profile-dob");        
        const streetv= document.getElementById("update-profile-address");        
        const submitbtn= document.getElementById("update-profile-submitbtn");        
        const successMsg= document.getElementById("update-profile-success-msg");        
        const errorMsg= document.getElementById("update-profile-error-msg");        
        const selectCountryv= document.getElementById("update-profile-selectCountry");        
        const selectStatev= document.getElementById("update-profile-selectState");        
        const selectCityv= document.getElementById("update-profile-selectCity");        





var selectCountry=sendRequestWithOutToken("country/getCountryList",{} );

var selectCity=sendRequestWithOutToken("country/getCountryList",{} );
var profileOutput=sendRequestWithToken("lawyer/getProfile",{} );

selectCountry.then(data=>{
    //data.obj;

    for (var i = 0; i < data.obj.length; i++) {
        //console.log(data.obj[i].name);
        var option = document.createElement("option");
        option.value = data.obj[i].id;
        option.text = data.obj[i].name;
        selectCountryv.add(option);
    }
});

selectCountryv.addEventListener("change", (e)=>{
    if (selectCountryv.value == 'None') {
        successMsg.hidden=false;
        errorMsg.innerHTML = "Please select Country.";
        errorMsg.hidden = false;
    }else{
        fetch(URL + 'state/getStateListByCountryId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({countryId:selectCountryv.value})
        }).then((response) => response.json())
        // Then with the data from the response in JSON....then((data) => {
            .then((selectState) => {
        console.log(selectState.code);
        if(selectState.code ==200)
        {
            console.log("hel");
            selectStatev.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                selectStatev.add(option);
                for (var i = 0; i < selectState.obj.length; i++) {
                    console.log(selectState.obj[i].name);
                    var option = document.createElement("option");
                    option.value = selectState.obj[i].id;
                    option.text = selectState.obj[i].name;
                    
                    selectStatev.add(option);
                    // html += '<option value='+data.obj[i].id+' >' + data.obj[i].name + '</option>';
                }
        }else{
            successMsg.hidden=false;
            errorMsg.innerHTML = selectState.obj;
            errorMsg.hidden = false;
        }

    }).catch((error) => {
        console.error('Error:', error);
        registrationErrorMsg.innerHTML = error;
        registrationErrorMsg.hidden = false;;
    });
    }
    

});


profileOutput.then((dataString=>{
    if(dataString.code=="200")
    {
        //console.log(dataString);
        
        namev.value=dataString.obj.name;
        emailv.value=dataString.obj.email;
        mobilev.value=dataString.obj.mobile;
        dobv.value=dataString.obj.dob;
        experiencev.value=dataString.obj.experience;
        streetv.value=dataString.obj.address;

    }else{
        errorMsg.innerText=dataString.obj;
        errorMsg.hidden=false;
    }

}));


submitbtn.addEventListener("click",(e=>{
    

    var data={id: null,
        name:namev.value,
        email:emailv.value,
        mobile:mobilev.value,
        experience:experiencev.value
    }
    var profileMesssage=sendRequestWithToken("lawyer/updateProfile",data );

    profileMesssage.then((dataString=>{
        if(dataString.code=="200")
        {
            errorMsg.hidden=false;
            successMsg.innerText=dataString.obj;
            successMsg.hidden=false;
        }else
        {
            successMsg.hidden=false;
            errorMsg.innerText=dataString.obj;
            errorMsg.hidden=false;
        }
    }));
    
}));
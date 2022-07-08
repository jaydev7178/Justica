
const URL="http://localhost:8081/api/"; 


const profileHomeLogut = document.getElementById("profile-home-logout");
profileHomeLogut.addEventListener("click", (e) =>
{
    localStorage.clear();
    window.location.href = "login.html";
})


const token = localStorage.getItem('token');
        ////console.log('token is '+token);
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

const ProfileHomeErrorMsg = document.getElementById("profile-home-error-msg");
var cityId=localStorage.getItem('cityId');
var stateId=localStorage.getItem('stateId');
var countryId=localStorage.getItem('countryId');
//console.log(localStorage.getItem('token'));

fetch(URL + 'city/getCityList', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id:cityId})
}).then((response) => response.json())
// Then with the data from the response in JSON....then((data) => {
    .then((cityData) => {
    ////console.log('Success:', data);
    //console.log('Success:', cityData.obj);
    //data.obj;
    if (cityData.code == "200") {
        //console.log(cityData.obj.stateId);
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
            ////console.log('Success:', data);
            //console.log('Success:', StateData.obj);
            //data.obj;
            if (StateData.code == "200") {
                //console.log(StateData.obj.name);
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
                    ////console.log('Success:', countryData);
                    //console.log('Success:', countryData.obj);
                    //countryData.obj;
                    if (countryData.code == "200") {
                        //console.log(countryData.obj.name);
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
    ////console.log('Success:', countryData);
    //console.log('Success:', countryData.obj);
    //countryData.obj;
    if (countryData.code == "200") {
        //console.log(countryData.obj.name);
        ProfileHomeCity.innerHTML=countryData.obj.name;
        
    } 
    // RcountryData = countryData;
});

const ProfileHomeSelectLawType= document.getElementById("profile-home-selectLawType");
const ProfileHomeSelectLawSubtype= document.getElementById("profile-home-selectLawSubtype");


fetch(URL + 'lawType/getLawTypeList', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token'),
    },
    body: JSON.stringify({})
}).then((response) => response.json())
// Then with the countryData from the response in JSON....then((countryData) => {
    .then((lawType) => {
    ////console.log('Success:', countryData);
    //console.log('Success:', lawType.obj);
    //countryData.obj;
    if (lawType.code == "200") {
        ProfileHomeSelectLawType.innerHTML=null;
                var option = document.createElement("option");
                option.value ='None';
                option.text = 'None';
                
                ProfileHomeSelectLawType.add(option);
                for (var i = 0; i < lawType.obj.length; i++) {
                    //console.log(lawType.obj[i].name);
                    var option = document.createElement("option");
                    option.value = lawType.obj[i].id;
                    option.text = lawType.obj[i].name;
                    
                    ProfileHomeSelectLawType.add(option);
                    //console.log(ProfileHomeSelectLawType.value);
                    


                }
        
    } 
  
});
ProfileHomeSelectLawType.addEventListener('change',(e) => {
    
    if(ProfileHomeSelectLawType.value!='None')
    {
        fetch(URL + 'lawSubtype/getLawSubtypeByLawTypeIdList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token':''+localStorage.getItem('token')+'',
            },
            body: JSON.stringify({lawTypeId:ProfileHomeSelectLawType.value})
        }).then((response) => response.json())
        // Then with the countryData from the response in JSON....then((countryData) => {
            .then((lawSubType) => {
            ////console.log('Success:', countryData);
            //console.log('lawSubType:', lawSubType.obj);
            //countryData.obj;
            if (lawSubType.code == "200") {
                ProfileHomeSelectLawSubtype.innerHTML=null;
                        var option = document.createElement("option");
                        option.value ='None';
                        option.text = 'None';
                        
                        ProfileHomeSelectLawSubtype.add(option);
                        for (var i = 0; i < lawSubType.obj.length; i++) {
                            //console.log(lawSubType.obj[i].name);
                            var option = document.createElement("option");
                            option.value = lawSubType.obj[i].id;
                            option.text = lawSubType.obj[i].name;
                            
                            ProfileHomeSelectLawSubtype.add(option);
        
        
                        }
                
            } 
          
        });
    }else
    {
        ProfileHomeErrorMsg.innerText="Please Select Type.";
        ProfileHomeErrorMsg.hidden=false;

    }

});

async function lawyerLawSubtypeMappingAPI(data,apiName)
{
    const reponse= await fetch("http://localhost:8081/api/lawyerLawSubtypeMapping/"+apiName,{
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


// async function getLawyerLawSubtypeMapping(data)
// {
//     const reponse= await fetch("http://localhost:8081/api/lawyerLawSubtypeMapping/getLawyerLawSubtypeMappingList",{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'token':''+localStorage.getItem('token')+'',
//         },
//         body: JSON.stringify(data)
//     });

//     var data=reponse.json();
//     return data;
    
// } 

// async function deleteLawyerLawSubtypeMapping(data)
// {
//     const reponse= await fetch("http://localhost:8081/api/lawyerLawSubtypeMapping/deleteLawyerLawSubtypeMappingById",{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'token':''+localStorage.getItem('token')+'',
//         },
//         body: JSON.stringify(data)
//     });

//     var data=reponse.json();
//     return data;
    
// } 



function deleteLawyerSubtypeMapping(lawyerSubtypeMappingid){
    console.log('delete id '+lawyerSubtypeMappingid);
    var input={id:lawyerSubtypeMappingid}

    
    var output=lawyerLawSubtypeMappingAPI(input,"deleteLawyerLawSubtypeMappingById");
    
    output.then((getdata=>{
        if(getdata.code=="201")
        {
            ProfileHomeErrorMsg.innerText=getdata.obj;
            ProfileHomeErrorMsg.hidden=false;
        }else{
            ProfileHomeErrorMsg.hidden=true;
            $("#profile-home-success-msg a").text(getdata.obj);
            document.getElementById("profile-home-success-msg").hidden=false;
            //window.location.href = 'profile-home.html';
            location.reload();
        }

    }));
}



const ProfileHomeAddTypeBtn= document.getElementById("profile-home-addTypeBtn");
const ProfileHomeUlLawSubType= document.getElementById("profile-home-ul-lawSubType");

var input={};
var output=lawyerLawSubtypeMappingAPI(input,"getLawyerLawSubtypeMappingList");
output.then((getdata=>{
    if(getdata.code=="201")
    {
        ProfileHomeErrorMsg.innerText=getdata.obj;
        ProfileHomeErrorMsg.hidden=false;
    }else{
        ProfileHomeErrorMsg.hidden=true;

        console.log("getdata");
        console.log(getdata);
        for (var i = 0; i < getdata.obj.length; i++) {
            console.log(getdata.obj.lawSubtypeName);
            $("#profile-home-ul-lawSubType #profile-home-ul-row").append("<div><div class='row' style='padding: 22px;'>\
            <li><a>"+getdata.obj[i].lawSubtypeName+"</a></li>\
            <center>\
            <button type='button' class='close' value="+getdata.obj[i].id+" onclick='deleteLawyerSubtypeMapping(this.value)' data-dismiss='alert' aria-label='Close'>\
                <span aria-hidden='true'>&times;</span>\
            </button></center>\
        </div></div>");
            
        }
    }
    
}));

ProfileHomeAddTypeBtn.addEventListener("click",(e)=> {
    
    if(ProfileHomeSelectLawSubtype.value=="None")
    {console.log("ntm");
        ProfileHomeErrorMsg.innerText="Please Select Subtype.";
        ProfileHomeErrorMsg.hidden=false;
    }else{
        var input={lawSubtypeId:ProfileHomeSelectLawSubtype.value};
        var output=lawyerLawSubtypeMappingAPI(input,"saveLawyerLawSubtypeMapping");
        
        output.then((data=>{
            if(data.code=="201")
            {
                ProfileHomeErrorMsg.innerText=data.obj;
                ProfileHomeErrorMsg.hidden=false;
            }else{
                ProfileHomeErrorMsg.hidden=true;
            $("#profile-home-success-msg a").text(data.obj);
            document.getElementById("profile-home-success-msg").hidden=false;
            }
            location.reload();
            

            
        }));
        
        
        
        // fetch(URL + , {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token':localStorage.getItem('token'),
        //     },
        //     body: JSON.stringify()
        // }).then((response) => response.json())
        // // Then with the countryData from the response in JSON....then((countryData) => {
        //     .then((lawType) => {
        //     ////console.log('Success:', countryData);
        //     //console.log('Success:', lawType.obj);
        //     //countryData.obj;
        //     if (lawType.code == "200") {
        //                 ProfileHomeSelectLawType.innerHTML=null;
                        
        //                 console.log(ProfileHomeSelectLawSubtype.value);
        //                 console.log(ProfileHomeSelectLawSubtype.options[ProfileHomeSelectLawSubtype.selectedIndex].text);
        //                 var li = document.createElement("li");
        //                 li.value =ProfileHomeSelectLawSubtype.value;
        //                 li.innerHTML =atag;
        //                 ProfileHomeSelectLawType.add(option);
        //                 for (var i = 0; i < lawType.obj.length; i++) {
        //                     //console.log(lawType.obj[i].name);
        //                     var atag = document.createElement("a");
        //                     //atag.text= ;
        //                     ProfileHomeSelectLawType.add(option);
        //                     //console.log(ProfileHomeSelectLawType.value);
                            
        
        
        //                 }
                
        //     } 
          
        // });

        

        
        //ProfileHomeUlLawSubType.appendChild(li)
    }
});




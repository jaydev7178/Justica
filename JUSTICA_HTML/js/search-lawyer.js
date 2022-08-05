// const token = localStorage.getItem('token');
//         console.log('token is '+token);
//         if(!token)
//         {
//             window.location.href = 'login.html';
//             document.getElementById('login-error-msg').innerHTML('Session expired, Please login again.');
//             document.getElementById('login-error-msg').hidden=false;
//         }


// const loginErrorMsg = document.getElementById('profile-view-logout');
// loginErrorMsg .addEventListener('click', (e) =>
// {
//     localStorage.clear();
//     window.location.href = 'login.html';
// })

async function sendRequestWithToken(apiPath,data)
{
    const reponse= await fetch('http://localhost:8081/api/'+apiPath,{
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
    const reponse= await fetch('http://localhost:8081/api/'+apiPath,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    var data=reponse.json();
    return data;
    
}
const searchLawyerName = document.getElementById('searchLawyerName');
const searchLawyerBtn = document.getElementById('searchLawyerBtn');
var profilesOutput=sendRequestWithOutToken('lawyer/getLawyerList',{} );

searchLawyers();
function searchLawyers(){
    console.log("hello");
    profilesOutput.then((dataString=>{
        if(dataString.code=='200')
        {
            
            console.log(searchLawyerName.value);
            console.log(dataString);
            var lawyerList=$(dataString.obj).filter( function(i,ele) { return ele
                
                 });
            console.log(lawyerList);
            
            for (var i = 0; i < lawyerList.length; i++) {
                
                $('#searchedList').append("\
                <div class='col-lg-8 col-md-6 mb30'>\
                            <div class='f-box f-icon-left f-icon-rounded'>\
                                <div class='lawyer-badge-avatar' style='padding-right:20px'>\
                                <a href='profile-view.html?id="+lawyerList[i].id+"'>\
                                    <img alt='Poonam Desai' src='../JUSTICA_HTML/images/team/1 - Copy.jpg' style='border: 10px solid #eaa636;'>\
                                </a>\
                            </div>\
                                <!-- <i class='icofont-group bg-color text-light'></i> -->\
                                <div class='fb-text'>\
                                    <a href='#'><h4 style='width:163.5px;'>"+ lawyerList[i].name+"</h4></a>\
                                    \
                                    <p>Advocate, Vadodara<br>5 Years</p>\
                                    \
                                    <div class='fa fa-star checked'></div>\
                                    <div class='fa fa-star checked'></div>\
                                    <div class='fa fa-star checked'></div>\
                                </div>\
                                <div class='container-fluid' style='padding-left: 10px;'>\
                                    <div class='fa fa-check-square checked'>Fluent in Hindi, English, Gujarati</div>\
                                    <div class='fa fa-check-square checked'>Family Law, Property Law, Criminal Law, Civil Law</div>\
                                    <button style='background-color: #327199;border-radius: 5px;'>Book a Counsultant</button>\
                                    <button style='background-color:#eaa636;border-radius: 5px;'>Ask a Question?</button>\
                                </div>\
                            </div>\
                        </div>\
                ");
            }
    
    //         ProfileViewlawyerName.innerHTML=dataString.obj.name;
    //         ProfileviewEmail.innerText=dataString.obj.email;
    //         ProfileviewMobile.innerText=dataString.obj.mobile;
    // ProfileviewEexperience.innerText=dataString.obj.experience;
    // Profileviewdob.innerText=dataString.obj.dob;
    // ProfileviewLicenseNo.innerText=dataString.obj.licenseNo;
    // ProfileviewAddress.innerText=dataString.obj.address;
    // ProfileviewCity.innerText=dataString.obj.cityName;
    //  ProfileviewState.innerText=dataString.obj.stateName;
    //  ProfileviewCountry.innerText=dataString.obj.countryName;
        }else{
            // ProfileViewErrorMsg.innerText=dataString.obj;
            // ProfileViewErrorMsg.hidden=false;
        }
    
    }));
};

searchLawyerBtn.addEventListener('click', (e) => {
    
    profilesOutput.then((dataString=>{
        if(dataString.code=='200')
        {
            
            console.log(searchLawyerName.value);
            console.log(dataString);
            var lawyerList=$(dataString.obj).filter( function(i,ele) { return (ele.name.valueOf()===searchLawyerName.value.valueOf())? ele.name.valueOf() : ele
                
                 });
            console.log(lawyerList);
            
            for (var i = 0; i < lawyerList.length; i++) {
                
                $('#searchedList').append("\
                <div class='col-lg-8 col-md-6 mb30'>\
                            <div class='f-box f-icon-left f-icon-rounded'>\
                                <div class='lawyer-badge-avatar' style='padding-right:20px'>\
                                <a href='profile-view.html?id="+lawyerList[i].id+"'>\
                                    <img alt='Poonam Desai' src='../JUSTICA_HTML/images/team/1 - Copy.jpg' style='border: 10px solid #eaa636;'>\
                                </a>\
                            </div>\
                                <!-- <i class='icofont-group bg-color text-light'></i> -->\
                                <div class='fb-text'>\
                                    <a href='#'><h4 style='width:163.5px;'>"+ lawyerList[i].name+"</h4></a>\
                                    \
                                    <p>Advocate, Vadodara<br>5 Years</p>\
                                    \
                                    <div class='fa fa-star checked'></div>\
                                    <div class='fa fa-star checked'></div>\
                                    <div class='fa fa-star checked'></div>\
                                </div>\
                                <div class='container-fluid' style='padding-left: 10px;'>\
                                    <div class='fa fa-check-square checked'>Fluent in Hindi, English, Gujarati</div>\
                                    <div class='fa fa-check-square checked'>Family Law, Property Law, Criminal Law, Civil Law</div>\
                                    <button style='background-color: #327199;border-radius: 5px;'>Book a Counsultant</button>\
                                    <button style='background-color:#eaa636;border-radius: 5px;'>Ask a Question?</button>\
                                </div>\
                            </div>\
                        </div>\
                ");
            }
    
    //         ProfileViewlawyerName.innerHTML=dataString.obj.name;
    //         ProfileviewEmail.innerText=dataString.obj.email;
    //         ProfileviewMobile.innerText=dataString.obj.mobile;
    // ProfileviewEexperience.innerText=dataString.obj.experience;
    // Profileviewdob.innerText=dataString.obj.dob;
    // ProfileviewLicenseNo.innerText=dataString.obj.licenseNo;
    // ProfileviewAddress.innerText=dataString.obj.address;
    // ProfileviewCity.innerText=dataString.obj.cityName;
    //  ProfileviewState.innerText=dataString.obj.stateName;
    //  ProfileviewCountry.innerText=dataString.obj.countryName;
        }else{
            // ProfileViewErrorMsg.innerText=dataString.obj;
            // ProfileViewErrorMsg.hidden=false;
        }
    
    }));
});

// var praticeAreaOutput=sendRequestWithToken('lawyerLawSubtypeMapping/getLawyerLawSubtypeMappingList',{} );

// praticeAreaOutput.then((dataString=>{
//     if(dataString.code=='200')
//     {
//         console.log(dataString);
//         var subTypeList=dataString.obj;
//         subTypeList.forEach(subTypeObj => {
//             $('#profile-view-praticeArea').append('\
//             <div class='col-lg-4 col-md-6 mb30'>\
//                             <div class='f-box f-icon-left f-icon-rounded'>\
//                                 <i class='icofont-group bg-color text-light'></i>\
//                                 <div class='fb-text'>\
//                                     <h4>'+subTypeObj.lawSubtypeObj.name+'</h4>\
//                                     <p>'+subTypeObj.lawSubtypeObj.description+'\
//                                     </p>\
//                                 </div>\
//                             </div>\
//                         </div> \
//             ');
//         });
//     }else{
//         ProfileViewErrorMsg.innerText=dataString.obj;
//         ProfileViewErrorMsg.hidden=false;
//     }

// }));






async function lawyerLawSubtypeMappingAPI(data,apiName)
{
    const reponse= await fetch('http://localhost:8081/api/'+apiName,{
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



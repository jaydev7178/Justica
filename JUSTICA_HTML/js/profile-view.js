const token = localStorage.getItem('token');
        //console.log('token is '+token);
        if(!token)
        {
            window.location.href = "login.html";
            document.getElementById("login-error-msg").innerHTML('Session expired, Please login again.');
            document.getElementById("login-error-msg").hidden=false;
        }

const ProfileViewlawyerName = document.getElementById("profile-view-lawyerName");
ProfileViewlawyerName.innerHTML=localStorage.getItem('name');


const loginErrorMsg = document.getElementById("profile-view-logout");
loginErrorMsg .addEventListener("click", (e) =>
{
    localStorage.clear();
    window.location.href = "login.html";
})

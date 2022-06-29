//import URL from "./config.js";


function getCountrylist()
{
    console.log(URL);
    var redata = {}
    //const data = { username: varusername, password:varpassword };
        fetch(URL+'country/getCountryList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(null),
                })
                .then((response) => response.json())
                //Then with the data from the response in JSON...
                .then((data) => {
                console.log('Success:', data);
                redata=JSON.stringify(data);
                console.log(redata);
                return data.obj[0].name;
                console.log('check');
                }); 
                
            
}

function getdata()
{
    console.log('huu');
    return 'hello';
}
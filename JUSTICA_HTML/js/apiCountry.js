import URL from "./config.js";


export default function getCountrylist()
{
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
                return data;
                })
                //Then with the error genereted...
                .catch((error) => {
                console.error('Error:', error);
                    return error;
                }); 

            
}

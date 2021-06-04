const BASE_URL = 'https://restcountries.eu/rest/v2';

export default function fetchCountries(countriesId) {
    
   return fetch(`${BASE_URL}/name/${countriesId}`)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Error fetching data');
        })
        .catch(error => {
            console.log('Error:', error)
        });
}
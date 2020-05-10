const https = require('https');
const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';
const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';


//
// Immediately invoked async/await
//

(async() => {
    let ltc_data = await get_ltc_data();
    let state_data = await get_state_data();
    console.log(ltc_data);
    console.log(state_data)
})();

async function get_state_data() {
    return new Promise((resolve, reject) => {
        https.get(state_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);

            resp.on('end', () => resolve(JSON.parse(data)));

            resp.on('error', () => reject('Error occurred retrieving state data.'))
        })
    })    
}

async function get_ltc_data() {
    return new Promise((resolve, reject) => {
        https.get(ltc_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
    
            resp.on('end', () => resolve(JSON.parse(data)));
            
            resp.on('error', () => reject('Error occurred retrieving ltc data.'));
        });
    });
}


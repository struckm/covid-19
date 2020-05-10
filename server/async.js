const https = require('https');
const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';
const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';


//
// Immediately invoked async/await
//

(async() => {
    let ltc_data = await get_data(ltc_url);
    let state_data = await get_data(state_url);
    console.log(ltc_data);
    console.log(state_data);
})();

async function get_data(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => resolve(JSON.parse(data)));
            resp.on('error', () => reject(`Error occurred retrieving data for ${url}.`));
        });
    });
}
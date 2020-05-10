const https = require('https');
const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';
const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';

function get_state_data() {
    return new Promise((resolve, reject) => {
        https.get(state_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);

            resp.on('end', () => resolve(JSON.parse(data)));

            resp.on('error', () => reject('Error occurred retrieving state data.'))
        })
    })    
}
function get_ltc_data() {
    return new Promise((resolve, reject) => {
        https.get(ltc_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
    
            resp.on('end', () => resolve(JSON.parse(data)));
            
            resp.on('error', () => reject('Error occurred retrieving ltc data'));
        });
    });
}

let promises = [];

promises.push(get_ltc_data());
promises.push(get_state_data());

Promise.all(promises)
    .then((values) => {
        console.log(values[0], values[1]);
    // console.log(JSON.parse(values[0]));
});

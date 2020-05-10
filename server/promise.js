const https = require('https');
const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';
const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';

function get_data(url) {
    return new Promise((resolve, reject) => {
        https.get(state_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk);
            resp.on('end', () => resolve(JSON.parse(data)));
            resp.on('error', () => reject('Error occurred retrieving state data.'));
        });
    });
}

let promises = [];

promises.push(get_data(ltc_url));
promises.push(get_data(state_url));

Promise.all(promises)
    .then((values) => {
        console.log(values[0], values[1]);
});

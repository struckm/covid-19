const http = require('http');
const express = require('express');
const app = express();
const https = require('https');

const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';
const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';
const cdc_url = 'https://data.cdc.gov/resource/r8kw-7aab.json';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', async (req, res) => {
    let ltc_data = await get_data(ltc_url);
    let state_data = await get_data(state_url);
    let cdc_data = await get_data(cdc_url);

    let response = {
        ltc: ltc_data,
        state: state_data,
        cdc: cdc_data
    };

    res.send(response);
});

function get_data(url) {
    return new Promise((resolve, reject) => {
        https.get(url, resp => {
            let data = '';
            resp.on('data', chunk => data += chunk);
            resp.on('end', ()=> resolve(JSON.parse(data)));
            resp.on('error', () => reject('Error occurred retrieving ltc data.'));
        });
    });
}

app.listen(5000, () => console.log('app listening on port 5000'));

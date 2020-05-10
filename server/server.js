const http = require('http');
const express = require('express');
const app = express();
const https = require('https');

const ltc_url = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';

const state_url = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    // res.send('request successful');

    //
    // Illinois 
    //

    // URL for LTC data
    // https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1

    let promises = [];

    let response = {};
    promises.push(get_ltc_data());


    promises.all(() => {
        console.log('Promises resolved');
    });

    // let state_data = await get_state_data();
    console.log('get_ltc_data returned');

    res.send(ltc_data);

    // URL for Test Results - 
    // https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1

    // const results_illinois = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';

    // https.get('https://interactives.dallasnews.com/data-store/2020/coronavirus-map-2020-03.json', (resp) => {
    //     let data = '';

    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     resp.on('end', () => {
    //         res.send(data);
    //     });
    // });
    // });


    //
    // Need to use puppeteer to pull the data from the URL below.
    //
    //
    // CDC Actual deaths
    //
    // let cdc = 'https://www.cdc.gov/nchs/nvss/vsrr/covid19/index.htm';
});

function get_ltc_data() {
    return https.get(ltc_url, (resp) => {
        let data = '';
        resp.on('data', (chunk)=> {
            data += chunk;
        });

        resp.on('end', ()=> {
            console.log('get ended.')
            return JSON.parse(data);
        });
    });

}

app.listen(5000, () => console.log('app listening on port 5000'));




// Write this code using promises as well as using async await


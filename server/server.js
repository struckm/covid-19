const http = require('http');
const express = require('express');
const app = express();
const https = require('https');

app.get('/', (req, res) => {
    //
    // Illinois 
    //

    // URL for LTC data
    // https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1

    const ltc_illinois = 'https://www.dph.illinois.gov/sitefiles/COVIDLTC.json?nocache=1';

    https.get(ltc_illinois, (resp) => {
        let data = '';

        resp.on('data', (chunk)=> {
            data += chunk;
        });

        resp.on('end', ()=> {
            res.send(data);
        });
    });

    // URL for Test Results - 
    // https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1

    const results_illinois = 'https://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1';

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
});

app.listen(5000, () => console.log('app listening on port 5000'));



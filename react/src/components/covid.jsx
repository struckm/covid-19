import React, { Component } from 'react';
import './covid.css';

import { 
    VictoryBar, 
    VictoryChart, 
    VictoryAxis,
    VictoryTheme
 } from 'victory';

class Covid extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            results: null
        }
    }

    componentDidMount() {
        this.getLTCData()
            .then((resp) => {
                if(resp.ok) {
                    return resp.json();
                } else {
                    throw new Error('Error retrieving data from server');
                }
            })
            .then((json) => {
                // console.log(json);
                this.setState({
                    results: json
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getLTCData() {
        // make a call to the backend to retrieve the LTC data
        const url = 'http://localhost:5000/';

        // const options = {
        //     method:'GET',
        //     mode: 'no-cors',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // };

        return fetch(url);
    }

    render() {
        let { results } = this.state;
        let ltcUpdateDate = null;
        let stateUpdateDate = null;
        let ltcDeaths = null;
        let stateDeaths = null;
        let stateDeathsByDate = null;
        let perDeathsByLTC = null;
        let testResults = [];

        let tickFormats = null;

        if(results) {
            let ltc = results.ltc;
            let state = results.state;
            // let cdc = results.cdc;
            // let hosp = results.hosp;
    
            ltcUpdateDate = `${ltc.LastUpdateDate.month}/${ltc.LastUpdateDate.day}/${ltc.LastUpdateDate.year}`;
            ltcDeaths = ltc.FacilityValues.reduce((sum, facility) => sum += facility.deaths, 0);

            stateUpdateDate = `${state.LastUpdateDate.month}/${state.LastUpdateDate.day}/${state.LastUpdateDate.year}`;
            stateDeaths = state.state_testing_results.values[state.state_testing_results.values.length - 1].deaths;
            stateDeathsByDate = state.state_testing_results.values.find((item) => item.testDate === ltcUpdateDate);
            stateDeathsByDate = stateDeathsByDate.deaths;

            perDeathsByLTC = (ltcDeaths/stateDeathsByDate)*100;
            perDeathsByLTC = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 4}).format(perDeathsByLTC);

            for(let i=0; i < results.state.state_testing_results.values.length; i++){
                let todaysResults = results.state.state_testing_results.values[i];
                let priorResults = null;
                if(i === 0) {
                    testResults.push(todaysResults);                    
                } else {
                    // total_tested, confirmed_cases, deaths
                    priorResults = results.state.state_testing_results.values[i-1];
                    let result = {
                        testDate: todaysResults.testDate,
                        total_tested: todaysResults.total_tested - priorResults.total_tested,
                        confirmed_cases: todaysResults.confirmed_cases - priorResults.confirmed_cases,
                        deaths: todaysResults.deaths - priorResults.deaths
                    };
                    result.percentagePos = (result.confirmed_cases/result.total_tested)*100;
                    result.percentagePos = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 4}).format(result.percentagePos);
                    testResults.push(result);
                }
                tickFormats = testResults.map(item => item.testDate).splice;
            }
            // console.log(testResults);
            // console.log(results.state);
            // console.log(results.cdc);
            // let cdc_illinois = results.cdc.filter(item => item.state === 'Illinois');
            // console.log(cdc_illinois);
        }

        return (
            <div>
                <h1>
                    COVID-19 Stats
                </h1>
                <section>
                    <h1>State Data</h1>
                    { stateDeaths &&
                        <div>
                            <p>
                                Deaths: {stateDeaths}
                            </p>
                            <p>
                                Deaths on LTC Date: {stateDeathsByDate}
                            </p>
                            <p>
                                Percentage of deaths in LTC: {perDeathsByLTC}%
                            </p>
                        </div>
                    }
                    { stateUpdateDate &&
                        <span>Last Update Date: {stateUpdateDate}</span>
                    }
                </section>
                <section>
                    <h1>Long Term Care Stats</h1>
                    <div>
                    { ltcDeaths &&
                        <p>Deaths: {ltcDeaths}</p>
                    }
                    { ltcUpdateDate && 
                        <p>Last Update Date: {ltcUpdateDate}</p>
                    }
                    </div>
                </section>
                <VictoryChart
                    domainpadding={20}
                >
                    <VictoryAxis
                        tickValues={tickFormats}
                        tickFormat={tickFormats}
                    >

                    </VictoryAxis>
                </VictoryChart>

            </div>
        );
    }
}

export default Covid;
import React, { Component } from 'react';
import './covid.css';

class Covid extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            ltc: null,
            state: null
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
                console.log(json);
                this.setState({
                    ltc: json.ltc,
                    state: json.state
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
        let { ltc, state } = this.state;
        let ltcUpdateDate = null;
        let stateUpdateDate = null;
        let ltcDeaths = null;
        let stateDeaths = null;

        if(ltc) {
            ltcUpdateDate = `${ltc.LastUpdateDate.month}/${ltc.LastUpdateDate.day}/${ltc.LastUpdateDate.year}`;
            ltcDeaths = ltc.FacilityValues.reduce((sum, facility) => sum += facility.deaths, 0);
        }

        if(state) {
            stateUpdateDate = `${state.LastUpdateDate.month}/${state.LastUpdateDate.day}/${state.LastUpdateDate.year}`;
            stateDeaths = state.state_testing_results.values[state.state_testing_results.values.length - 1].deaths;
        }

        return (
            <div>
                <h1>
                    COVID-19 Stats
                </h1>
                <section>
                    <h1>State Data</h1>
                    { stateDeaths &&
                        <span>Deaths: {stateDeaths}  </span>
                    }
                    { stateUpdateDate &&
                        <span>Last Update Date: {stateUpdateDate}</span>
                    }
                </section>               
                <section>
                    <h1>Long Term Care Stats</h1>
                    { ltcDeaths &&
                        <span>Deaths: {ltcDeaths}  </span>
                    }
                    { ltcUpdateDate && 
                        <span>Last Update Date: {ltcUpdateDate}</span>
                    }
                </section>
            </div>
        );
    }
}

export default Covid;
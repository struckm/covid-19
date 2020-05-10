import React, { Component } from 'react';
import './covid.css';

class Covid extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            facilities: [],
            lastUpdateDate: null 
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
                    lastUpdateDate: json.LastUpdateDate
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
        let { lastUpdateDate } = this.state;

        let updateDate = null;
        if(lastUpdateDate) {
            updateDate = `${lastUpdateDate.month}/${lastUpdateDate.day}/${lastUpdateDate.year}`;
        }
        return (
            <div>
                <div>
                    COVID-19 LTC Stats
                </div>
                { updateDate && 
                <div>
                    Last Update Date: {updateDate}
                </div>
                }
            </div>
        );
    }
}

export default Covid;
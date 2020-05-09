import React, { Component } from 'react';
import './covid.css';

class Covid extends Component {
    constructor(props, context) {
        super(props);
        this.getLTCData = this.getLTCData.bind(this);
        this.test = 'testing 123....';
    }

    async getLTCData() {
        // make a call to the backend to retrieve the LTC data
        let url = 'http://localhost:5000/';

        await fetch(url,
            {
                method:'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then( response => {
                console.log(response.json());
            });
    }

    render() {
        console.log(this.getLTCData());        

        return (
            <div>
                This is the {this.test} component
            </div>
        );
    }
}

export default Covid;
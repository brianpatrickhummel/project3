import React, { Component } from 'react';
import axios from 'axios';


const HOST = 'http://localhost:3001/'


class bizProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            appointments: ''
        };
    }

    componentDidMount() {
        axios.get(`${HOST}api/companies/:id`)
            .then(response => {
                this.setState({ 
                    company: response.data, 
                    appointments: response.data.appointments
                });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="bizProfileContainer">
                <h3>
                    Here we will build the biz profile after calling it. including:
                - imageURL as the picture
                - Biz Name
                - Location under it(?)
                - Description of their biz, products, services
                - list of all appointments (time permitting, based on a button click or similar)
                </h3>
            </div>
        )
    }
}

export default bizProfile;
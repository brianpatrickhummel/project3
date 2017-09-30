import React, { Component } from 'react';
import axios from 'axios';


const HOST = 'http://localhost:3001/'


class bizProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company: '',
            appointments: '',
            showAppts: false

        };
    }

    componentDidMount() {
        axios.get(`${HOST}api/companies`)
        .then(response => {
            const dataLength = response.data.length-1;
            const thisResponse = response.data[dataLength];
            this.setState({ company: thisResponse });
            console.log(thisResponse);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleChange() {
        this.setState({
            showAppts: true
        })
    };


    appts() {
        if (this.state.showAppts === true) {
            if (this.state.appointments instanceof Object) {
                return this.state.appointments.map(function (object, i) {
                    return <apptRow obj={object} key={i} className="bizRow">
                        <h2>Name: {object.firstName} {object.lastName}</h2>
                        <h2>Email: {object.email} </h2>
                        <h2>Phone: {object.phone}</h2>
                        <h4>Appointment Date: {object.appointmentDate}</h4>
                    </apptRow>;
                });
            }
        } else {
            return <h2>Sorry, no appointments found</h2>
        }
    };

    render() {
        return (
            <div className="bizProfileContainer">
            <h2>Welcome to your profile! This will show your company's Name, Description, Location, and Picture...
                make it count and show off your best style!</h2>
                <bizRow className="bizProfile">
                    <h2>Name: {this.state.company.name}</h2>
                    <img src={this.state.company.imageURL} alt="business" />
                    <h2>Location: {this.state.company.location}</h2>
                    <h4>Description: {this.state.company.description}</h4>
                    <button type="button" className="btn btn-info" onChange={this.handleChange}>View Appointments</button>
                    {this.appts()}
                </bizRow>
            </div>
        )
    }
}

export default bizProfile;
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
        }
    };

    render() {
        return (
            <div className="bizProfileContainer">
                <bizRow className="bizRow">
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
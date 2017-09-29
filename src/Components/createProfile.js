import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

// const HOST = process.env || 'http://localhost:3001/'

const HOST = 'http://localhost:3001/'

class createProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: '',
            imageURL: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
        if (event.target.value === this.state.imageURL) {
                const regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i
                return regex.test(this.state.imageURL)
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post(`${HOST}api/companies`, {
            // username: this.props.auth.username,
            // password: this.props.auth.password,
            name: this.state.name,
            description: this.state.description,
            location: this.state.location,
            imageURL: this.state.imageURL
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // checkImageURL = imageURL => {
    //     const regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i
    //     return regex.test(imageURL)
    // }

    render() {
        return (
            <div className="container">
                <Link to="/bizProfile"><RaisedButton label="Skip to Profile" className="btn btn secondary" /></Link>
                <h1>Create your Business Profile</h1>

                <form onSubmit={this.handleSubmit}>


                    <div className="form-group">
                        <label> Name: </label>
                        <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.handleChange} placeholder="Business Name"/>

                    </div>

                    <div className="form-group">
                        <label> Description: </label>
                        <input type="text" className="form-control" id="description" value={this.state.description} onChange={this.handleChange} placeholder="Add a description for your business"/>

                    </div>
                   
                    <div className="form-group">
                        <label> Location: </label>
                        <input type="text" className="form-control" id="location" value={this.state.location} onChange={this.handleChange} placeholder="City, State"/>

                    </div>

                    <div className="form-group">
                        <label> Image URL: </label>
                        <input type="text" className="form-control" id="imageURL" value={this.state.imageURL} onChange={this.handleChange} placeholder="https://www.example.com/image.png"/>
                    </div>

                    <input type="submit" value="Submit" />
                </form>

                <h2>Click here to view your profile</h2>
                <Link to="/bizProfile"><RaisedButton label="View Profile" className="btn btn secondary" /></Link>
            </div>
        );
    }
}

export default createProfile;

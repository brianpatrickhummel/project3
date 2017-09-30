import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import axios from 'axios';
import GoogleApiWrapper from '../Config/googleMaps';

//might need to import more components
const HOST = 'http://localhost:3001/'


const bizStyle = {
    marginTop: 180,
    height: "100%"
  };

//need to setup lifecycle events (w/ API calls) 
//custom events for surfacing barber data + adding a Link component with each barber directing to Calendar component
class userLandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: '',
            gMaps: ''
        };
    }

    componentDidMount() {
        axios.get(`${HOST}api/companies`)
            .then(response => {
                this.setState({ companies: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    bizRow() {
        if (this.state.companies instanceof Object) {
            return this.state.companies.map(function (object, i) {
                return <bizRow  key={i} className="bizRow"> 
                    <h2>Name: {object.name}</h2>
                    <img src={object.imageURL} alt="business"/>
                    <h2>Location: {object.location}</h2>
                    <h4>Description: {object.description}</h4>
                    <Link to="/schedule"><button type="button" className="btn btn-info">Book Appointment</button></Link> 
                    </bizRow>;
            })
        }
    };


    render() {
        return (
            <div>
                <div className="container gmapCon">
                    <Card className="gMapsContainer">
                        <CardText>
                            <h2>Barbers in Austin, TX [BETA]</h2>
                        </CardText>
                    </Card>
                </div>
                <br />
                <GoogleApiWrapper />
                <br />
                <div className="container barberContainer" style={bizStyle}>
                    <Card className="barbers">
                        <CardText>
                            <h2>Barbers to visit</h2>
                            {this.bizRow()}
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}

export default userLandingPage;
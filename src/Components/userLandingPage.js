import React, { Component } from 'react';
import {Card, CardText} from 'material-ui/Card';
//might need to import more components

//need to setup lifecycle events (w/ API calls) 
//custom events for surfacing barber data + adding a Link component with each barber directing to Calendar component
class userLandingPage extends Component {
    render() {
        return (
            <div className="userContainer">
                <Card className="gMapsContainer">
                    <CardText>
                        This is where we will place Gmaps and set it to Austin (static) for the booking app beta.
                    </CardText>
                </Card>
                <Card className="barbers">
                    <CardText>
                        This is where we will surface all the available barbers with the option to book.
                    </CardText>
                </Card>
            </div>
        )
    }
}

export default userLandingPage;
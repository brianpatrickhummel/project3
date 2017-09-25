import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

class createProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="newBizForm">
                <form onSubmit={this.handleSubmit}>
                    <h2>
                        This form will handle everything we need to create a new business profile:
                - name of business
                - description of business (services offered & price)
                - location (default to ATX for this due to time constraints)
                - imageURL
                - include the username and pass prop values passed from auth0
            </h2>
                    <label>
                        Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <h2>
                    Here we will add a button to skip (takes to bizProfile component & disable if it doesn't exist)
            <Link to="/bizProfile"><RaisedButton label="Skip" primary={true} /></Link>
                    The Submit button above should auto-redirect to the bizProfile component
            </h2>
            </div>
        );
    }
}

export default createProfile;

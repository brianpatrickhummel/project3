import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

//styling for the RaisedButtons
const style = {
  margin: 12,
  borderRadius: 10,
 
};

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div className="loggedInContainer">
              <h2>
                You are logged in!
                Are you a User or a Business?
              </h2>
              <Link to="/userLandingPage"><RaisedButton label="User" primary={true} style={style} className="homeBtn" /></Link>
              <Link to="/createProfile"><RaisedButton label="Businsess" secondary={true} style={style} className="homeBtn" /></Link>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <div className="loggedOutContainer">
              <h3>
                Welcome to the Booker App. 
                </h3>
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
                </a>
              {' '}to continue.
              </h4>
              </div>
          )
        }
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { Route, Router } from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Calendar from './Components/Calendar';
import userLandingPage from './Components/userLandingPage';
import createProfile from './Components/createProfile';
import bizProfile from './Components/bizProfile';


const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

//need to include <Route path="/userLandingPage" render={(props) => <userLandingPage auth={auth}  {...props}/>} />
//back in with the auth passed as props <Route path="/createProfile" render={(props) => <createProfile auth={auth} {...props}/>} />
//HAS to happen for all components - keeps track of logged in users & info
export const makeMainRoutes = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Router history={history} component={App}>
          <div>
            <Route path="/" render={(props) => <App auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
            }}/>
            <Route path="/schedule" render={(props) => <Calendar auth={auth} {...props} />} />
            <Route path="/userLandingPage" component={userLandingPage}/>
            <Route path="/createProfile" component={createProfile}/>
            <Route path="/bizProfile" component={bizProfile}/>
          </div>
        </Router>
      </MuiThemeProvider>
  );
}

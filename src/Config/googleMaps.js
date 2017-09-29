import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
    width: '97%',
    height: '100%',
    padding: 90,
    marginBottom: 20,
    flexAlign: 'justifyCenter'
  };

export class MapContainer extends Component {

render() {
   return (
       <div className="container">
     <Map google={this.props.google} 
     style={style}
     initialCenter={{
            lat: 30.267153,
            lng: -97.7430608
          }}
    zoom={15}>
         

       <Marker onClick={this.onMarkerClick}
               name={'Current location'} />

       <InfoWindow onClose={this.onInfoWindowClose}>
           <div>
             <h1>ATX</h1>
           </div>
       </InfoWindow>
     </Map>
     </div>
   );
 }
}

export default GoogleApiWrapper({
 apiKey: ("AIzaSyAShqoobO_dMjqnf4Im6reYHQAho5JoW0I")
})(MapContainer)
import React, { Component } from 'react';
import MapComponent from './MapComponent';
import MessageForm from './MessageFrom';

import './App.css';

class App extends Component {

  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    isUserLocated: false,
    zoom: 1,
  };


  onUserLocated = (location)=> {
    this.setState({
      location: {
        lat: location.lat,
        lng: location.lng
      },
      isUserLocated: true,
      zoom: 15
    });
  };

  updateUserDetails = (userDetails) =>{
    this.setState(userDetails);
  };
  render() {
    return (
      <div className="App">
        <MapComponent onUserLocated={this.onUserLocated} state={this.state}/>
        <MessageForm state={this.state} updateUserDetails = {this.updateUserDetails}/>
      </div>
    );
  }
}

export default App;

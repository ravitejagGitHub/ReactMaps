import React, { Component } from 'react';
import MapComponent from './MapComponent';
import MessageForm from './MessageFrom';
import Joi from 'joi';
import './App.css';

const API_URL = window.location.hostname === "localhost" ? "http://localhost:9000/Message" : "prod_url";



const userDetailsSchema = Joi.object().keys({
  name: Joi.string().regex(/^[A-Za-z\d\-_\s]{6,100}$/).min(3).max(30).required(),
  message: Joi.string().min(1).max(500).required()
})


class App extends Component {

  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    isUserLocated: false,
    zoom: 1,
  };

  isFormValid = () => {
    const userDetails = {
      name: this.state.name,
      message: this.state.message
    }
    const result = Joi.validate(userDetails, userDetailsSchema);
    return !result.error && this.state.isUserLocated ? true : false
  }

  onUserLocated = (location) => {
    this.setState({
      location: {
        lat: location.lat,
        lng: location.lng
      },
      isUserLocated: true,
      zoom: 15
    });
  };

  submitUserDetails = () => {

    if (this.isFormValid()) {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          message: this.state.message,
          latitude: this.state.location.lat,
          longitude: this.state.location.lng
        })
      }).then(res => res.json())
        .then(message => {
          console.log(message);
        }).catch(err => console.error(err))
    }

  }
  updateUserDetails = (userDetails) => {
    this.setState(userDetails);
  };
  render() {
    return (
      <div className="App">
        <MapComponent onUserLocated={this.onUserLocated} state={this.state} />
        <MessageForm state={this.state} updateUserDetails={this.updateUserDetails}
          submitUserDetails={this.submitUserDetails}
          isFormValid={this.isFormValid} />
      </div>
    );
  }
}

export default App;

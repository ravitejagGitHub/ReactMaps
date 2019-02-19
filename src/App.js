import React, { Component } from 'react';
import MapComponent from './MapComponent';
import MessageForm from './MessageFrom';
import Joi from 'joi';
import './App.css';

const API_CREATE_MESSAGE_URL = window.location.hostname === "localhost" ? "http://localhost:9000/Message" : "prod_url";



const userDetailsSchema = Joi.object().keys({
  name: Joi.string().regex(/^[A-Za-z\d\-_\s]{3,100}$/).min(3).max(30).required(),
  message: Joi.string().min(1).max(500).required()
})


class App extends Component {

  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    isUserLocated: false,
    zoom: 2,
    messages: [],
    sendingMessage: false,
    sentMessage: false
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
      zoom: 9,
    });
  };

  updateMessages = (messages) => {
    const keys = {};
    messages = messages.reduce((all, message)=>{
      const key = `${message.latitude}${message.longitude}`;
      if(keys[key]) {
        keys[key].otherMessages = keys[key].otherMessages || [];
        keys[key].otherMessages.push(message);
      } else {
        keys[key] = message;
        all.push(message);
      }
      return all;
    }, [])
    this.setState({
      messages
    });
  }
  submitUserDetails = () => {

    if (this.isFormValid()) {
      this.setState({
        sendingMessage: true,
      });
      fetch(API_CREATE_MESSAGE_URL, {
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
          this.setState({
            sentMessage: true
          });
        }).catch(err => {
          console.error(err);
          this.setState({
            sentMessage: false
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
            });
          }, 1000);

        })
    }
  }

  updateUserDetails = (userDetails) => {
    this.setState(userDetails);
  };
  render() {
    return (
      <div className="App">
        <MapComponent state={this.state}
          onUserLocated={this.onUserLocated}
          updateMessages={this.updateMessages} />
        <MessageForm state={this.state}
          updateUserDetails={this.updateUserDetails}
          submitUserDetails={this.submitUserDetails}
          isFormValid={this.isFormValid}
        />
      </div>
    );
  }
}

export default App;

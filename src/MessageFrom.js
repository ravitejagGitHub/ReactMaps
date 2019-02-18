import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class MessageForm extends Component {

    handleFieldChange = (event) => {
        const { name, value } = event.target;
        this.props.updateUserDetails({
            [name]: value
        });
    }
    onUserFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.submitUserDetails();
    }

    render() {
        let state = this.props.state;
        return (
            <Card body className="message-form">
                <CardTitle>Welcome to Raviteja-Maps</CardTitle>
                {!state.sendingMessage && !state.sentMessage && state.isUserLocated ?
                    <CardBody>
                        <CardText>Leave a message with your location.</CardText>
                        <Form onSubmit={this.onUserFormSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    onChange={this.handleFieldChange}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    />
                            </FormGroup>

                            <FormGroup>
                                <Label for="message">Message</Label>
                                <Input
                                    onChange={this.handleFieldChange}
                                    type="textarea"
                                    name="message"
                                    placeholder="Enter a message"
                                />
                            </FormGroup>

                            <Button type="submit" color="info" disabled={!this.props.isFormValid()} >Submit</Button>
                        </Form>
                    </CardBody> : 
                    state.sentMessage ? <CardText>Thanks for submitting a message.</CardText> : 
                        <img src="/images/loading-compass.gif" alt="loading..." className="loadingIcon" />
                }
            </Card>
        );
    }
}

export default MessageForm;

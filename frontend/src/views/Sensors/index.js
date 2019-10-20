import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import './index.css'
import { array } from 'prop-types';

export default class Sensor extends Component{

    constructor(props) {
        super(props);

        this.state = {
            sensors: null,
            loading: false,
            first: true,
            };
        this.get_all()
    }

    get_all = async () => {
        const response = await axios.get('http://localhost:5000/all')
        this.setState({sensors: response.data.sensors}, () => console.log(this.state))
        this.refresh()
    }

    action = async (sensor) => {
        const response = await axios.post('http://localhost:5000/sensor/set', {sensor: sensor})
    }

    discovey = async () => {
        this.setState({loading: true})
        const response = await axios.get('http://localhost:5000/discovery')
        this.get_all()
        this.setState({loading: false})
    }

    refresh = () => {
        if(!this.state.loading){
            setTimeout(this.get_all, 2000);
        }
    }

    render(){
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card className="p-4">
                                <CardBody style={{display: 'flex', flex: 1, flexDirection: 'column',alignItems: 'center'}}>
                                     <Row className="justify-content-space-around">
                                        <h1>Sensores</h1>
                                        <button onClick= {this.discovey}  disabled={this.state.loading} type="button" class="btn btn-primary" style={{marginLeft: '5px'}}>
                                            <i class="fa fa-cog"></i>
                                        </button>
                                    </Row>
                                    <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', minWidth: '100%', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                                        { this.state.sensors ?
                                            this.state.sensors.map((sensor, key) => (
                                                <Card className="p-4">
                                                    <CardBody >
                                                        <h2>Nome:&nbsp;{sensor.name}</h2>
                                                        <h4>Status:&nbsp;{sensor.status}</h4>
                                                    </CardBody>
                                                    <button onClick= {() => this.action(sensor.name)} type="button" class="btn btn-primary">Atuar</button>
                                                </Card>
                                            ))
                                            :
                                            null
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
          </div>
        )
    }
}
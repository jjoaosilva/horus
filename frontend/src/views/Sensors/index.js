import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import './index.css'

export default class Sensor extends Component{

    constructor(props) {
        super(props);

        this.state = {
            sensors: null
          };
        this.get_all()
      }

      get_all = async () => {
        const response = await axios.get('http://localhost:5000/all')
        this.setState({sensors: response.data.sensors}, () => console.log(this.state))
      }

      action = async (sensor) => {
        const response = await axios.post('http://localhost:5000/sensor/set', {sensor: sensor})
        this.get_all()
      }
    render(){
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card className="p-4">
                                <CardBody style={{display: 'flex', flex: 1, flexDirection: 'column',alignItems: 'center'}}>
                                    <h1>Sensores</h1>
                                    <div style={{display: 'flex', flexDirection: 'row', minWidth: '100%', justifyContent: 'space-around', flexWrap: 'wrap'}}>
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
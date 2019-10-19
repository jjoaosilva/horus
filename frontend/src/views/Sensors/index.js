import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import './index.css'
import { subscribe } from './subs';

const sensores = [
    {
        name: "Cafeteira",
        ip: '0.0.0.0',
        port: '0',
        status: 'Ligada/Parada'
    },
    {
        name: "Lampada",
        ip: '0.0.0.0',
        port: '0',
        status: 'Ligada'
    },
    {
        name: "Sensor de Temperatura",
        ip: '0.0.0.0',
        port: '0',
        status: '25'
    },
]

export default class Sensor extends Component{

    constructor(props) {
        super(props);

        this.state = {
            temperature: {name: null, status: null},
            coffe: {name: null, status: null},
            lamp: {name: null, status: null},
          };

          subscribe((err, temperature) => {console.log("Temperstura: ", temperature); this.setState({ temperature }) }, 'Temperatura', 2000 );
          subscribe((err, coffe)       => {console.log("coffe: ", coffe); this.setState({ coffe })       }, 'Cafeteira'  , 1000 );
          subscribe((err, lamp)        => {console.log("lamp: ", lamp); this.setState({ lamp })        }, 'Lampada'    , 5000 );
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
                                        {/* {
                                            sensores.map((sensor, key) => (
                                                <Card className="p-4">
                                                    <CardBody >
                                                        <h2>Nome:&nbsp;{sensor.name}</h2>
                                                        <h4>Ip:&nbsp;{sensor.ip}</h4>
                                                        <h4>Porta:&nbsp;{sensor.port}</h4>
                                                        <h4>Status:&nbsp;{sensor.status}</h4>
                                                    </CardBody>
                                                </Card>
                                            ))
                                        } */}
                                        <Card className="p-4">
                                                    <CardBody >
                                                        <h2>Nome:&nbsp;{this.state.temperature.name}</h2>
                                                        <h4>Status:&nbsp;{this.state.temperature.status}</h4>
                                                    </CardBody>
                                                </Card>
                                                <Card className="p-4">
                                                    <CardBody >
                                                        <h2>Nome:&nbsp;{this.state.coffe.name}</h2>
                                                        <h4>Status:&nbsp;{this.state.coffe.status}</h4>
                                                    </CardBody>
                                                </Card>
                                                <Card className="p-4">
                                                    <CardBody >
                                                        <h2>Nome:&nbsp;{this.state.lamp.name}</h2>
                                                        <h4>Status:&nbsp;{this.state.lamp.status}</h4>
                                                    </CardBody>
                                                </Card>
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
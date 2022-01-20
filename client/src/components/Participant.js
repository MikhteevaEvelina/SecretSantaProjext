import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

const Participant = ({participant, xs}) => {
    return (
        <Col xs={xs}>
            <Card style={{width:'23vh', height:'23vh'}} border={"light"} className="border-0 align-items-center">
                <Image width={'82%'} height={'82%'} src={participant.img} className="rounded-circle"/>
                <Card.Body>
                    <Card.Subtitle className="text-center">{participant.name}</Card.Subtitle>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Participant;
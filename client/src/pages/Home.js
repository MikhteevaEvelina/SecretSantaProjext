import React, {useContext, useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import UserList from "../components/UserList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchParticipants} from "../http/participantAPI";
import santaLogo from "../assets/santa_logo.jpg"

const Home = observer(() => {
    const {participant} = useContext(Context)

    useEffect(() =>{
        fetchParticipants().then(data => {
            if (data && data.rows.length) {
                participant.setParticipants(data.rows)
            }
        })
    }, [])

    return (
        <Container className="h-100">
            <Row className="h-100">
               <Col className="d-flex justify-content-start align-items-stretch vh-100"
                    xs={4}
                    style={{maxHeight: window.innerHeight - 59}}>
                   <Card className="h-100 overflow-auto">
                       <Card.Img variant="top" src={santaLogo} />
                       <Card.Body>
                           <Card.Subtitle>Приятной игры!</Card.Subtitle>
                           <Card.Text>
                               Суть игры состоит в обмене подарками между всеми участниками. Имя человека, которому вы дарите подарок, выбирается случайным образом и сообщается только вам. До момента обмена подарками никто не знает, кто кому дарит подарок. И ни один участник, не знает, кому выпало его имя.
                               Наш сервис помогает легко и просто распределить имена и адреса участников друг между другом, так чтобы каждый дарил и получал подарок.
                               Чтобы подарок подошел именно вам и чтобы облегчить вашему Санте выбор, на сайте можно заполнить анкету, указав пол, возраст и свои интересы. Наш алгоритм сам распределит, кто кому дарит подарок. Санте остается подготовить подарок и отправить его на почтовый адрес, указанный в анкете.
                           </Card.Text>
                       </Card.Body>
                       <Card.Footer className="text-muted">Мы надеемся на честность наших Сант</Card.Footer>
                   </Card>
               </Col>
                <Col xs={8}>
                    <h4 className="text-center p-4">{participant.participants ?
                        "Наши участники:"
                        :
                        "Станьте первым участником! Зарегистрируйтесь."}</h4>
                    <UserList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Home;
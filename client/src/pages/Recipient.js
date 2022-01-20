import React, {useContext, useEffect} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchOneByUser} from "../http/recipientAPI";
import {useParams} from "react-router-dom";
import noPhoto from '../assets/noPhoto.jpg'

const Recipient = observer(() => {

    const {recipient} = useContext(Context)
    const {id} = useParams()

    useEffect(() =>{
        try {
            fetchOneByUser(id).then(data => {
                if (data && data.id) {
                    recipient.setRecipient(data)
                }
            })
        } catch (e) {

        }
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={recipient.img ? (process.env.REACT_APP_API_URL + recipient.img) : noPhoto }/>
                </Col>
                <Col md={8}>
                    <h2 className="m-auto">Для кого я Санта</h2>
                    <Row className="d-flex flex-column align-items-center mt-3">
                        <h6>Имя: </h6>
                        <p>{recipient.name}</p>
                    </Row>
                    <Row className="d-flex flex-column align-items-center">
                        <h6>Возраст: </h6>
                        <p>{recipient.age}</p>
                    </Row>
                    <Row className="d-flex flex-column align-items-center">
                        <h6>Пол: </h6>
                        <p>{recipient.sex}</p>
                    </Row>
                    <Row className="d-flex flex-column align-items-center">
                        <h6>Адрес: </h6>
                        <p>{recipient.post_adr}</p>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h3>Увлечения</h3>
                {(recipient.userHobby && recipient.userHobby.length) ?
                    <Container className="ps-0">
                        {recipient.userHobby.map((hobby, index) =>
                            <Row key={hobby.id}
                                 style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                                {hobby.name}
                            </Row>
                        )}
                    </Container>
                    :
                    <div>Информация не указана</div>
                }
            </Row>
        </Container>
    );
});

export default Recipient;
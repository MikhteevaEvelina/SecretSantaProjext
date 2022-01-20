import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const HobbyList = observer(() => {
    const {user} = useContext(Context)


    const removeHobby = (id) => {
        user.setUserHobby(user.userHobby.filter(i => i.id !== id))
    }
    const changeHobby = (key, value, id) => {
        user.setUserHobby(user.userHobby.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    return (
        <Container className="ps-0">
            {user.userHobby.map(i =>
                <Row className="mt-3" key={i.id}>
                    <Col md={8}>
                        <Form.Control
                            value={i.name}
                            onChange={(e) => changeHobby('name', e.target.value, i.id)}
                            placeholder="Введите название свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            onClick={() => removeHobby(i.id)}
                            variant={"outline-danger"}
                        >
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
});

export default HobbyList;
import React, {useContext, useEffect} from 'react';
import {Container, Form, Row, Stack} from "react-bootstrap";
import UserList from "../components/UserList";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchParticipants} from "../http/participantAPI";
import Pages from "../components/Pages";

const ParticipantList = observer(() => {
    const {participant} = useContext(Context)

    useEffect(() =>{
        fetchParticipants(null, 1, 12).then(data => {
            if (data && data.rows.length) {
                participant.setParticipants(data.rows)
                participant.setTotalCount(data.count)
            }
        })
    }, [])

    useEffect(() => {
        fetchParticipants(participant.search, participant.page, 12).then(data => {
            if (data && data.rows.length) {
                participant.setParticipants(data.rows)
                participant.setTotalCount(data.count)
            }
        })
    }, [participant.page, participant.search])

    return (
        <Container className="h-100">
            <Row className="h-100">
                <h4 className="text-center p-4">{ (participant.participants && participant.participants.length) ?
                    "Наши участники:"
                    :
                    "Станьте первым участником! Зарегистрируйтесь."}</h4>
                <Stack className="align-items-center">
                <Form.Control
                    className="w-50 mb-3"
                    type="text"
                    placeholder="Поиск участника..."
                    value={participant.search}
                    onChange={e => participant.setSearch(e.target.value)}
                />
                </Stack>
                <UserList/>
                <Pages/>
            </Row>
        </Container>
    );
});

export default ParticipantList;
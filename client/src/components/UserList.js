import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import Participant from "./Participant";
import {useLocation} from "react-router-dom";
import {HOME_ROUTE} from "../utils/consts";

const UserList = observer(() => {
    const {participant} = useContext(Context)
    const location = useLocation()
    const isMain = location.pathname === HOME_ROUTE

    return (
        <Row className="d-flex align-items-center">
            {participant.participants.map(p =>
                <Participant key={p.id} participant={p} xs={isMain ? 4 : 3}/>
            )}
        </Row>
    );
});

export default UserList;
import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {deleteOne} from "../../http/userAPI";
import {useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import {Context} from "../../index";

const DeleteUser = observer(({show, onHide}) => {

    const {id} = useParams()
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const deleteAccount = () => {

        deleteOne(id).then(data => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.setItem('token', '')
            onHide()
            navigate(HOME_ROUTE)
        }).catch(e => {
            alert(e.response.data.message)
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить профиль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Вы уверены что хотите удалить профиль?</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={deleteAccount}>Да</Button>
                <Button variant="outline-danger" onClick={onHide}>Нет</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteUser;

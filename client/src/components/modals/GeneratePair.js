import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {generate} from "../../http/adminAPI";
import {observer} from "mobx-react-lite";

const AddPicture = observer(({show, onHide}) => {

    const generatePairs = () => {
        generate().then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Распределить пары участников
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Алгоритм распределения постарается по возможности подобрать пары так, чтобы два участника не были бы взаимно Сантами друг для друга.</div>
                <div>При распределении участников все пары будут созданы заново.</div>
                <div>Вы уверены что хотите распределить пары участников?</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={generatePairs}>Да</Button>
                <Button variant="outline-danger" onClick={onHide}>Нет</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddPicture;

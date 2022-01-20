import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Image} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import noPhoto from "../../assets/noPhoto.jpg";

const AddPicture = observer(({show, onHide}) => {

    const {user} = useContext(Context)
    const [img, setImg] = useState("")
    const [file, setFile] = useState(null)

    const selectFile = e => {
        if (e.target.files && e.target.files[0]) {
            setImg(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    const addFile = () => {
        user.setImg(img)
        user.setFile(file)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Установить аватар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {img ?
                        <Image width={150} height={150} src={img}/>
                        :
                        <Image width={150} height={150} src={user.img ? (process.env.REACT_APP_API_URL + user.img) : noPhoto}/>
                    }
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addFile}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddPicture;

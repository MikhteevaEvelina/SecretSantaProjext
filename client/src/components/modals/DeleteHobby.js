import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Image} from "react-bootstrap";
import {Context} from "../../index";
//import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const AddPicture = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    // const [name, setName] = useState('')
    // const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    // const [info, setInfo] = useState([])

    // useEffect(() => {
    //     fetchTypes().then(data => device.setTypes(data))
    //     fetchBrands().then(data => device.setBrands(data))
    // }, [])

    // const addInfo = () => {
    //     setInfo([...info, {title: '', description: '', number: Date.now()}])
    // }
    // const removeInfo = (number) => {
    //     setInfo(info.filter(i => i.number !== number))
    // }
    // const changeInfo = (key, value, number) => {
    //     setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    // }

    const selectFile = e => {
        user.user.img = e.target.files[0]
        setFile(e.target.files[0])
    }

    // const addDevice = () => {
    //     const formData = new FormData()
    //     formData.append('name', name)
    //     formData.append('price', `${price}`)
    //     formData.append('img', file)
    //     formData.append('brandId', device.selectedBrand.id)
    //     formData.append('typeId', device.selectedType.id)
    //     formData.append('info', JSON.stringify(info))
    //     createDevice(formData).then(data => onHide())
    // }

    const addFile = () => {
        //const formData = new FormData()
        //formData.append('img', file)
        //addPicture(formData).then(data => onHide())
        user.user.img = file
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
                    <Image width={150} height={150} src={user.user.img}/>
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

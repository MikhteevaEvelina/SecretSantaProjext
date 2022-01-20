import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row, Spinner, Stack} from "react-bootstrap";
import AddPicture from "../components/modals/AddPicture";
import {observer} from "mobx-react-lite";
import {fetchOneUser, update} from "../http/userAPI";
import {useParams} from "react-router-dom";
import {Context} from "../index";
import HobbyList from "../components/HobbyList";
import DeleteUser from "../components/modals/DeleteUser";
import noPhoto from '../assets/noPhoto.jpg'

const User = observer(() => {

    const {user} = useContext(Context)
    const [pictureVisible, setPictureVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const {id} = useParams()

    const addHobby = () => {
        user.setUserHobby([...user.userHobby, {id: Date.now(), name: ""}])
    }

    const updateUser = async () => {
        try {
            const formData = new FormData()
            formData.append('name', user.name)
            formData.append('sex', user.sex)
            formData.append('age', user.age)
            formData.append('post_adr', user.post_adr)
            formData.append('fileName', user.img)
            if (user.file) {
                formData.append('img', user.file)
            }
            formData.append('hobby', JSON.stringify(user.userHobby))
            await update(id, formData)
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() =>{
        fetchOneUser(id).then(data =>
            user.setUser(data))
    }, [])

    return (
        <Container>
            {user.id ?
                <Row className="mt-3">
                    <Col md={4}>
                        { user.file ?
                            <Image
                                width={300}
                                height={300}
                                src={user.img}/>
                            :
                            <Image
                                width={300}
                                height={300}
                                src={user.img ? (process.env.REACT_APP_API_URL + user.img) : noPhoto}/>
                        }
                        <Stack direction="horizontal" className="mt-2">
                            <Button
                                variant={"outline-dark"}
                                className="mt-4 p-2 w-50"
                                onClick={() => setPictureVisible(true)}
                            >
                                Установить аватар
                            </Button>
                        </Stack>
                        <AddPicture show={pictureVisible} onHide={() => setPictureVisible(false)}/>
                        <Stack direction="horizontal" className="mt-2">
                            <Button
                                onClick={updateUser}
                                className="mt-4 p-2 w-50"
                                variant={"outline-success"}>
                                Сохранить изменения
                            </Button>
                        </Stack>
                        <Stack direction="horizontal" className="mt-2">
                            <Button
                                onClick={() => setDeleteVisible(true)}
                                className="mt-4 p-2 w-50"
                                variant={"outline-danger"}>
                                Удалить профиль
                            </Button>
                        </Stack>
                    </Col>
                    <Col md={8}>
                        <h2 className="m-auto">Мой профиль</h2>
                        <Form className="d-flex flex-column mt-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    placeholder="Введите ваше имя..."
                                    value={user.name || ""}
                                    onChange={e => user.setName(e.target.value)}
                                />
                            </Form.Group>
                            <Stack direction="horizontal" className="mb-3 align-self-stretch">
                                <Form.Group className="w-50">
                                    <Form.Label>Возраст</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Укажите ваш возраст..."
                                        defaultValue={user.age || ""}
                                        onChange={e => user.setAge(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="ms-3 w-50">
                                    <Form.Label>Пол</Form.Label>
                                    <Form.Select
                                        value={user.sex || "М"}
                                        onChange={e => user.setSex(e.target.value)}>
                                        <option value="М">Мужской</option>
                                        <option value="Ж">Женский</option>
                                    </Form.Select>
                                </Form.Group>
                            </Stack>
                            <Form.Group className="mb-3">
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={user.post_adr || ""}
                                    placeholder="Укажите адрес, куда отправить подарок..."
                                    onChange={e => user.setAddress(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <h3>Увлечения</h3>
                                {(user.userHobby && user.userHobby.length) ?
                                    <HobbyList/>
                                    :
                                    <div>Расскажите о себе. Добавьте информация о своих увлечениях.</div>
                                }
                                <Row className="mt-3">
                                    <Col md={8}>
                                        <Button
                                            variant={"outline-dark"}
                                            onClick={addHobby}
                                        >
                                            Добавить
                                        </Button>
                                    </Col>
                                    <Col md={4}>

                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                :
                <Spinner animation={"border"} style={{textAlign: 'center'}}/>
            }
            <DeleteUser show={deleteVisible} onHide={() => setDeleteVisible(false)}/>
        </Container>
    );
});

export default User;
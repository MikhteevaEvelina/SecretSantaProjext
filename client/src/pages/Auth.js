import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Stack} from "react-bootstrap";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Auth = observer( () => {

    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(HOME_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 59}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        email={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2"
                        placeholder="Введите ваш email..."
                    />
                    <Form.Control
                        className="mt-2"
                        email={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль..."
                        type="password"
                    />
                    {isLogin ?
                        <Stack direction="horizontal" className="mt-2">
                            <div>Новый участник?</div>
                            <NavLink href={REGISTRATION_ROUTE}>Регистрация</NavLink>
                            <Button
                                className="ms-auto"
                                variant={"outline-success"}
                                onClick={signIn}>
                                Войти
                            </Button>
                        </Stack>
                        :
                        <Stack direction="horizontal" className="mt-2">
                            <div>Есть аккаунт?</div>
                            <NavLink href={LOGIN_ROUTE}>Авторизация</NavLink>
                            <Button
                                className="ms-auto"
                                variant={"outline-success"}
                                onClick={signIn}>
                                Зарегистрироваться</Button>
                        </Stack>
                    }
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
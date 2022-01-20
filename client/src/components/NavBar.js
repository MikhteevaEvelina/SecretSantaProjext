import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PARTICIPANT_ROUTE, RECIPIENT_ROUTE, USER_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
        navigate(HOME_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white', fontWeight:'bold'}} href={HOME_ROUTE}>Тайный Санта</NavLink>
                { user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Nav.Link href={PARTICIPANT_ROUTE}>Участники</Nav.Link>
                        <Nav.Link href={RECIPIENT_ROUTE + "/" + user.id}>Для кого я Санта</Nav.Link>
                        <Nav.Link href={USER_ROUTE + "/" + user.id}>Мой профиль</Nav.Link>
                        { user.role === 'ADMIN' ?

                            <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(ADMIN_ROUTE)}>Администрирование</Button>
                            :
                            <br></br>
                        }
                        <Button variant={"outline-light"} className="ms-2" onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Nav.Link href={PARTICIPANT_ROUTE}>Участники</Nav.Link>
                        <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
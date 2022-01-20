import Admin from "./pages/Admin";
import User from "./pages/User";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ParticipantList from "./pages/ParticipantList";
import Recipient from "./pages/Recipient.js";
import {ADMIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE, LOGIN_ROUTE, HOME_ROUTE, RECIPIENT_ROUTE, PARTICIPANT_ROUTE} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: USER_ROUTE + '/:id',
        Component: User
    },
    {
        path: RECIPIENT_ROUTE +'/:id',
        Component: Recipient
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PARTICIPANT_ROUTE,
        Component: ParticipantList
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
]

import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
//import DeleteHobby from "../components/modals/DeleteHobby";
import GeneratePair from "../components/modals/GeneratePair";

const Admin = () => {
    //const [hobbyVisible, setHobbyVisible] = useState(false)
    const [generateVisible, setGenerateVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            {/*<Button*/}
            {/*    variant={"outline-dark"}*/}
            {/*    className="mt-4 p-2"*/}
            {/*    onClick={() => setHobbyVisible(true)}*/}
            {/*>*/}
            {/*    Удалить хобби*/}
            {/*</Button>*/}
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setGenerateVisible(true)}
            >
                Сгенерировать пары
            </Button>
            {/*<DeleteHobby show={hobbyVisible} onHide={() => setHobbyVisible(false)}/>*/}
            <GeneratePair show={generateVisible} onHide={() => setGenerateVisible(false)}/>
        </Container>
    );
};

export default Admin;
import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination, Stack} from "react-bootstrap";

const Pages = observer(() => {
    const {participant} = useContext(Context)
    const pageCount = Math.ceil(participant.totalCount / participant.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Stack className="align-items-center">
            <Pagination className="mt-3 align-items-center">
                {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={participant.page === page}
                        onClick={() => participant.setPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                )}
            </Pagination>
        </Stack>
    );
});

export default Pages;

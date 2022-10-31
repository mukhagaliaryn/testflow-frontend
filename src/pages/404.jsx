import React from "react";
import MainLayout from "../layouts/main";


const NotFound = () => {
    return (
        <MainLayout
            title={"404 - Страница не найдено"}
            heading={"Страница не найдено"}
        >
            <h1>404</h1>
            <p>Страница не найдено</p>
        </MainLayout>
    )
}

export default NotFound;
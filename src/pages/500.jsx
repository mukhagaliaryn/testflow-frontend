import React from "react";
import MainLayout from "../layouts/main";


const IntervalError = () => {
    return (
        <MainLayout
            title={"500 - Серверная ошибка"}
            heading={"Серверная ошибка"}
        >
            <h1>500</h1>
            <p>Что пошло не так! Ошибка 500</p>
        </MainLayout>
    )
}

export default IntervalError;
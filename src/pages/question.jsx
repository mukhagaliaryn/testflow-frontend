import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/main";


const AddQuestion = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <MainLayout
            title={"Добавление вопросов"}
            heading={"Добавить вопрос"}
        >
            <div className="main-container">
                <h1>Hello world</h1>
            </div>
        </MainLayout>
    )
}

export default AddQuestion;
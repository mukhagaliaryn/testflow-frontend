import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/main";
import ReactRichEditor from 'react-rich-text-editor'


const AddQuestion = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <MainLayout
            title={"Добавление вопросов"}
            heading={"Добавить вопрос"}
        >
            <div className="main-container">
                {isAuthenticated &&
                    <ReactRichEditor height={200} />
                }
            </div>
        </MainLayout>
    )
}

export default AddQuestion;
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BACKEND_URL } from "../actions/types";
import { SUBJECTS } from '../actions/subjects';
import MainLayout from "../layouts/main";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import parse from 'html-react-parser';
import { TiFlowParallel } from 'react-icons/ti'; 


const TestDetail = ({test_category, access}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { register, handleSubmit } = useForm();
    const [selected, setSelect] = useState(null);
    
    const selectChange = e => {
        setSelect(e.target.value)
    }


    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${BACKEND_URL}/${router.query.test_slug}/${data.ln}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
                body: JSON.stringify(data)
            })

            const res = await response.json();

            if (response.status == 201) {
                router.push(`/testflow/${res.id}`);
            } else {
                alert("Что-то пошло не так. Повторите пожалуйста!")
            }

        } catch (e) {
            console.log(e);
        }
    }

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={test_category.test_name}
            heading={test_category.test_name}
        >
            {isAuthenticated &&
                <div className="main-container">
                    <div className="test-category-detail">
                        <div className="head">
                            <TiFlowParallel />
                            <h1>{test_category.test_name}</h1>
                        </div>
                        <div className="description">
                            {parse(test_category.description)}
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group">
                                <select {...register("ln")}>
                                    <option value="KZ">Қазақша</option>
                                    <option value="RU">Русский</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <select {...register("subject")} onChange={e => selectChange(e)} required>
                                    {SUBJECTS.map((item, i) => (
                                        <option key={i} value={item.key}>{item.value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <select {...register('sub_subject')} required>
                                    {SUBJECTS.map((item) => {
                                        return (
                                            item[selected] && item[selected].map((sub, i) => (
                                                <option key={i} value={sub.key}>{sub.value}</option>
                                            ))
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="input-group submit">
                                <button>Начать тестирование</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/test-category/${context.params.test_slug}/`, context.req.cookies.access && config)
    const test_category = await res.json();

    return {
        props: {
            test_category,
            access: context.req.cookies.access
        }
    }
}

export default TestDetail;
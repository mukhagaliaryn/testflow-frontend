import { useRouter } from "next/router";
import React, { useState } from "react";
import { BACKEND_URL } from "../../actions/types";
import { SUBJECTS } from '../../actions/subjects';
import MainLayout from "../../layouts/main";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TiFlowParallel } from 'react-icons/ti'; 


const TestDetail = ({ access }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { register, handleSubmit } = useForm();
    const [selected, setSelect] = useState(null);
    
    const selectChange = e => {
        setSelect(e.target.value);
    }
    

    const onSubmit = async (data) => {
        const body = {
            ln: data.ln,
            test_type: data.test_type,
            subjects: {
                first_req: data.first_req,
                second_req: data.second_req,
                third_req: data.third_req,
                first_subject: data.first_subject,
                second_subject: data.second_subject,
            }
        }

        try {
            const response = await fetch(`${BACKEND_URL}/testflow/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
                body: JSON.stringify(body)
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
            title={"Все тесты - Testflow"}
            heading={"Тесты"}
        >
            {isAuthenticated &&
                <div className="main-container">
                    <div className="test-category-detail">
                        <div className="head">
                            <TiFlowParallel />
                            <h2>Ұлттық Біріңғай Тестілеу</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group">
                                <select {...register("ln")}>
                                    <option value="KZ">Қазақша</option>
                                    <option value="RU">Русский</option>
                                </select>
                            </div>
                            <div>
                                <input type="hidden" {...register("test_type")} defaultValue="ENT" />
                            </div>
                            <div>
                                <input type="hidden" {...register("first_req")} defaultValue="history-kazakh" />
                            </div>
                            <div>
                                <input type="hidden" {...register("second_req")} defaultValue="reading"/>
                            </div>
                            <div>
                                <input type="hidden" {...register("third_req")} defaultValue="math-lit"/>
                            </div>
                            
                            <div className="input-group">
                                <input type="text" defaultValue={"Оқу сауаттылығы"} disabled/>
                            </div>
                            <div className="input-group">
                                <input type="text" defaultValue={"Қазақстан тарихы"} disabled/>
                            </div>
                            <div className="input-group">
                                <input type="text" defaultValue={"Математикалық сауаттылық"} disabled/>
                            </div>
                            <div className="input-group">
                                <select {...register("first_subject")} onChange={e => selectChange(e)} required>
                                    {SUBJECTS.map((item, i) => (
                                        <option key={i} value={item.key}>{item.value}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <select {...register('second_subject')} required>
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
    // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `JWT ${context.req.cookies.access}`
    //     }
    // }
    // const res = await fetch(`${BACKEND_URL}/testflow/`, context.req.cookies.access && config)

    return {
        props: {
            access: context.req.cookies.access || null
        }
    }
}


export default TestDetail;
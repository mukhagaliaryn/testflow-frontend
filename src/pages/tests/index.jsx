import { useRouter } from "next/router";
import React, { useState } from "react";
import { BACKEND_URL } from "../../actions/types";
import { SUBJECTS } from '../../actions/subjects';
import MainLayout from "../../layouts/main";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TiFlowParallel } from 'react-icons/ti';
import NotFound from '../404';
import useTranslation from "next-translate/useTranslation";
import { setAlert } from "../../actions/alert";


const TestDetail = ({ access, user_account }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation("common"); 
    const dispatch = useDispatch();
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
                dispatch(setAlert(t("tests.alerts.success"), "success"));
                router.push(`/testflow/${res.id}`);
            } else {
                dispatch(setAlert(t("tests.alerts.error"), "error"));
            }

        } catch (e) {
            console.log(e);
        }
    }

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    if(typeof window !== 'undefined' && (user_account && user_account.role === "ADMIN")) {
        return <NotFound />;
    }

    return (
        <MainLayout
            title={t("tests.header.title")}
            heading={t("tests.header.heading")}
            user_account={user_account}
        >
            {(isAuthenticated && (user_account && user_account.role !== "ADMIN")) &&
                <div className="main-container">
                    <div className="test-category-detail">
                        <div className="head">
                            <TiFlowParallel />
                            <h2>{t("tests.header.h1")}</h2>
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
                                <input type="text" defaultValue={t("tests.subjects.first")} disabled/>
                            </div>
                            <div className="input-group">
                                <input type="text" defaultValue={t("tests.subjects.second")} disabled/>
                            </div>
                            <div className="input-group">
                                <input type="text" defaultValue={t("tests.subjects.third")} disabled/>
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
                                <button>{t("tests.button")}</button>
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
    const res = await fetch(`${BACKEND_URL}/testflow/tests/`, context.req.cookies.access && config)
    const data = await res.json();

    const user_account = data.user_account || null;

    return {
        props: {
            user_account,
            access: context.req.cookies.access || null
        }
    }
}


export default TestDetail;
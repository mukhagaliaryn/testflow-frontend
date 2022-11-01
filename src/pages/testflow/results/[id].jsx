import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import TestLayout from "../../../layouts/test";


const TestFlow = ({user_test_data, first_questions}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation("common");

    const get_sum = (arr) => {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].max_mark;
        }
        return sum
    }

    const get_user_answer_sum = (arr) => {
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].mark;
        }
        return sum
    }

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <TestLayout
            title={"Тестілеу ағымы аяқталды - TestFlow"}
            user_test_data={user_test_data}
            first_questions={first_questions}
        >
            {isAuthenticated &&
                <div className="testflow-container">
                    <div className="test-time">
                        <div className="group">
                            <span className="label">{t("testflow.test-time.start-time")}</span>
                            <span className="value"><Moment format="DD.MM.YYYY - HH:MM:SS" date={user_test_data.start_time} /></span>
                        </div>
                        <div className="group">
                            <span className="label">{t("testflow.test-time.end-time")}</span>
                            <span className="value">-</span>
                        </div>
                        <div className="group">
                            <span className="label">{t("testflow.test-time.ln")}</span>
                            <span className="value">{user_test_data.ln === "RU" ? "Русский" : "Қазақша"}</span>
                        </div>
                        <div className="group">
                            <span className="label">Статус: </span>
                            {user_test_data.status ?
                                <span className="value finish">
                                    <span>{t("testflow.test-time.finish")}</span> 
                                    <AiOutlineCheckCircle />
                                </span>
                            :
                                <span className="value proccess">
                                    <span>{t("testflow.test-time.process")}</span>
                                    <AiOutlineFieldTime />
                                </span>
                            }
                        </div>
                    </div>

                    <div className="test-features">
                        <div className="head">
                            <span id="subject">{t("testflow.head.subject")}</span>
                            <span id="questions">{t("testflow.head.questions")}</span>
                            <span id="max-balls">{t("testflow.head.max-balls")}</span>
                            <span id="balls">{t("testflow.head.balls")}</span>
                        </div>
                        
                        {user_test_data.subjects.map((subject, i) => {
                            return (
                                <div className="result" key={i}>
                                    <span id="subject">{subject.title}</span>
                                    <span id="questions">{subject.question_count}</span>
                                    <span id="max-balls">
                                        {get_sum(user_test_data.get_user_answers.filter(obj => obj.question.subject.slug === subject.slug))}
                                    </span>
                                    <span id="balls">
                                        {get_user_answer_sum(user_test_data.get_user_answers.filter(obj => obj.question.subject.slug === subject.slug))}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="bottom">
                        <Link href={`/testflow/results/${user_test_data.id}/${first_questions[0].subject.slug}/question/${first_questions[0].id}`}>
                            <a className="start-test">Қатемен жұмыс жасау</a>
                        </Link>
                    </div>
                </div>
            }
        </TestLayout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/testflow/${context.params.id}/`, context.req.cookies.access && config)
    
    const data = await res.json();
    const user_test_data = data.user_test_data || null;
    const first_questions = data.first_questions || [];

    if (!user_test_data.status) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            user_test_data,
            first_questions
        }
    }
}

export default TestFlow;
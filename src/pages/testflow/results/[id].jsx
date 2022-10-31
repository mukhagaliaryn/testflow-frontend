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
    

    console.log(user_test_data);


    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <TestLayout
            title={"Тестілеу ағымы (ҰБТ) - TestFlow"}
            user_test_data={user_test_data}
            first_questions={first_questions}
        >
            {isAuthenticated &&
                <div className="testflow-container">
                    <div className="test-time">
                        <div className="start">
                            <span>Басталған уақыты: </span>
                            <span><Moment format="DD.MM.YYYY - HH:MM:SS" date={user_test_data.start_time} /></span>
                        </div>
                        <div className="end">
                            <span>Аяқалған уақыты: </span>
                            <span>-</span>
                        </div>
                        <div className="language">
                            <span>Язык: </span>
                            <span>{user_test_data.ln === "RU" ? "Русский" : "Қазақша"}</span>
                        </div>
                        <div className="status">
                            <span>Статус: </span>
                            {user_test_data.status ?
                                <span className="finish">
                                    Аяқталды
                                    <AiOutlineCheckCircle />
                                </span>
                            :
                                <span className="proccess">
                                    Процесс үстінде
                                    <AiOutlineFieldTime />
                                </span>
                            }
                        </div>
                    </div>

                    <div className="test-features">
                        <div className="head">
                            <span id="subject">Пәндер</span>
                            <span id="questions">Сұрақтар саны</span>
                            <span id="max-balls">Макс. балл</span>
                            <span id="balls">Балл</span>
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

    return {
        props: {
            user_test_data,
            first_questions
        }
    }
}

export default TestFlow;
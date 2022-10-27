import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import MainLayout from "../../layouts/main";
import TestLayout from "../../layouts/test";


const TestFlow = ({user_test_data, user_answers, first_questions}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <React.Fragment>
            {!user_test_data.status ? 
                <TestLayout
                    title={"Тестілеу ағымы (ҰБТ) - TestFlow"}
                    user_test_data={user_test_data}
                    first_questions={first_questions}
                >
                    {isAuthenticated &&
                        <div className="testflow-container">
                            <h1>{first_questions[0].subject.title}</h1>
                            <Link href={`/testflow/${user_test_data.id}/${first_questions[0].subject.slug}/question/${first_questions[0].id}`}>
                                <a>Тестілеуді бастау</a>
                            </Link>
                        </div>
                    }
                </TestLayout>
            :    
                <MainLayout
                    heading={"Тест аяқталды!"}
                >
                    {isAuthenticated && 
                        <div className="main-container">
                            <div className="user-tests-data">
                                <div className="head" style={{ gridTemplateColumns: "repeat(4, 1fr)"}}>
                                    <span id="ls">Предметы</span>
                                    <span id="status">Количество вопросов</span>
                                    <span id="status">Максимальные баллы</span>
                                    <span id="status">Пользовательские баллы</span>
                                </div>
                            </div>
                        </div>
                    }
                </MainLayout>
            }
        </React.Fragment>

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
    const user_answers = data.user_answers || [];
    const first_questions = data.first_questions || [];

    return {
        props: {
            user_test_data,
            user_answers,
            first_questions
        }
    }
}

export default TestFlow;
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import TestLayout from "../../layouts/test";


const TestFlow = ({user_test_data, user_answers, first_questions}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
                    <h1>{first_questions[0].subject.title}</h1>
                    <Link href={`/testflow/${user_test_data.id}/${first_questions[0].subject.slug}/question/${first_questions[0].id}`}>
                        <a>Тестілеуді бастау</a>
                    </Link>
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
    const user_answers = data.user_answers || [];
    const first_questions = data.first_questions || [];

    console.log(data);

    return {
        props: {
            user_test_data,
            user_answers,
            first_questions
        }
    }
}

export default TestFlow;
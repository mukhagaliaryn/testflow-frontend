import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import TestLayout from "../../layouts/test";


const TestFlow = ({ user_test_data, reverse_quizzes }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    const quiz = reverse_quizzes[0];

    return (
        <TestLayout
            user_test_data={user_test_data}
            reverse_quizzes={reverse_quizzes}
        >
            {isAuthenticated &&
                <div className="testflow-container">
                    <h1>{quiz.title}</h1>
                    <Link href={`/testflow/${user_test_data.id}/${quiz.slug}`}>
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
    const user_test_data = data.user_test_data || {};
    const reverse_quizzes = data.reverse_quizzes || [];

    return {
        props: {
            user_test_data,
            reverse_quizzes
        }
    }
}

export default TestFlow;
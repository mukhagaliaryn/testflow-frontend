import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import TestLayout from "../../../layouts/test";


const TestFlowQuizDetail = ({ user_test_data, reverse_quizzes }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }
    
    return (
        <TestLayout
            quizzes={user_test_data.quizzes || []}
            reverse_quizzes={reverse_quizzes}
        >
            {isAuthenticated &&
                <div className="subject-testflow">
                    <h1>Hello world</h1>
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
    const res = await fetch(`${BACKEND_URL}/testflow/${context.params.id}/${context.params.slug}/`, context.req.cookies.access && config)
    const data = await res.json();

    const user_test_data = data.user_test_data || [];
    const reverse_quizzes = data.reverse_quizzes || [];
    const quiz = data.quiz || {};

    return {
        props: {
            user_test_data,
            reverse_quizzes,
            quiz
        }
    }
}


export default TestFlowQuizDetail;
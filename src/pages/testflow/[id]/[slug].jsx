import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import TestLayout from "../../../layouts/test";


const TestFlowQuizDetail = ({ user_test_data, reverse_quizzes, quiz }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    console.log(user_test_data);
    console.log(reverse_quizzes);
    console.log(quiz);

    return (
        <TestLayout
            user_test_data={user_test_data}
            reverse_quizzes={reverse_quizzes}
            questions={quiz.get_questions}
        >
            {isAuthenticated &&
                <div className="subject-testflow">
                    {quiz.get_questions.map((item, i) => {
                        return (
                            <div key={i} className="question-box">
                                <div className="question-title">
                                    <p>{item.content}</p>
                                </div>
                                <ol className="answers">
                                    {item.get_answers.map((answer, i) => {
                                        return (
                                            <li className="answer" key={i}>
                                                <input type="radio" name={item.id} />
                                                <span>{answer.content}</span>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )
                    })}

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
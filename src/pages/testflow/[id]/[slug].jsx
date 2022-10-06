import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import TestLayout from "../../../layouts/test";
import parse from 'html-react-parser';


const TestFlowQuizDetail = ({ user_test_data, quiz, questions }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <TestLayout
            user_test_data={user_test_data}
            questions={questions}
            title={quiz.title}
        >
            {isAuthenticated &&
                <div className="subject-testflow">
                    {questions.map((item, i) => {
                        return (
                            <div key={i} className="question-box">
                                <div className="question-title">
                                    <div className="q-head">
                                        <span id="number">{i+1}.</span>
                                        <span>{parse(item.content)}</span>
                                    </div>
                                </div>
                                <ol className="answers">
                                    {item.get_answers.map((answer, i) => {
                                        return (
                                            <li className="answer" key={i}>
                                                <input type="radio" name={item.id} />
                                                <span>{parse(answer.content)}</span>
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
    const quiz = data.quiz || {};
    const questions = data.questions || [];

    return {
        props: {
            user_test_data,
            quiz,
            questions
        }
    }
}


export default TestFlowQuizDetail;
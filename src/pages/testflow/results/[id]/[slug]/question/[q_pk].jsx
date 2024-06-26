import React from "react";
import { BACKEND_URL } from "../../../../../../actions/types";
import TestLayout from "../../../../../../layouts/test";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const TestFlowQuestionDetail = ({ first_questions, user_test_data, subject, user_answer, user_answers, access }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();

    return (
        <TestLayout
            title={subject && router.locale === "ru" ? subject.title : subject.title_kk}
            user_test_data={user_test_data}
            user_answers={user_answers}
            user_answer={user_answer}
            subject={subject}
            first_questions={first_questions}
        >
            {(isAuthenticated && user_answer) &&
                <div className="question-testflow">
                    <div className="question-box">
                        <div className="question-title">
                            {user_answer.question.context &&
                                <div className="context">
                                    {parse(user_answer.question.context.content)}
                                </div>
                            }
                            <div className="q-head">
                                <span id="number">1.</span>
                                <span>{parse(user_answer.question.title)}</span>
                            </div>
                            <div className="content">
                                <span>{parse(user_answer.question.content || "")}</span>
                            </div>
                        </div>
                        <ol className="answers">
                            {user_answer.question.get_answers.map((answer, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        {user_answer.question.format === "ONE" ?
                                            <li className={answer.correct ? "answer correct" : "answer"}>
                                                <div className={answer.correct ? "radio selected" : "radio"}>
                                                    <span></span>
                                                </div>
                                                <span>{parse(answer.text)}</span>
                                                {user_answer.answers.find(id => id === answer.id) && "Менің жауабым"}
                                            </li>
                                        :
                                            <li className={answer.correct ? "answer correct" : "answer"}>
                                                <div className={answer.correct ? "checkbox selected" : "checkbox"}>
                                                    <span></span>
                                                </div>
                                                <span>{parse(answer.text)}</span>
                                                {user_answer.answers.find(id => id === answer.id) && "Менің жауабым"}
                                            </li>
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </ol>
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
    const res = await fetch(`${BACKEND_URL}/testflow/${context.params.id}/${context.params.slug}/question/${context.params.q_pk}/`, context.req.cookies.access && config)
    const data = await res.json();

    const first_questions = data.first_questions || [];
    const user_test_data = data.user_test_data || null;
    const subject = data.subject || null;
    const user_answer = data.user_answer || null;
    const user_answers = data.user_answers || [];

    if (user_test_data && !user_test_data.status) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            first_questions,
            user_test_data,
            subject,
            user_answer,
            user_answers,
            access: context.req.cookies.access || null
        }
    }
}



export default TestFlowQuestionDetail;
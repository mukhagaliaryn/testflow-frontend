import React from "react";
import { BACKEND_URL } from "../../../../../actions/types";
import TestLayout from "../../../../../layouts/test";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";


const TestFlowQuestionDetail = ({ first_questions, user_test_data, subject, user_answer, user_answers }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const choiceAnswer = async (id, q_id, a_id) => {

        try {
            const response = await fetch(`${BACKEND_URL}/testflow/user-answer/${id}/${q_id}/${a_id}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
            });

            console.log(response.status);
        } catch {
            console.log('Error!');
        }
    }

    return (
        <TestLayout
            title={subject.title}
            user_test_data={user_test_data}
            questions={user_answers}
            user_answer={user_answer}
            subject={subject}
            first_questions={first_questions}
        >
            {isAuthenticated &&
                <div className="subject-testflow">
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
                                            <li className="answer" >
                                                {/* <div className={user_answer.answers.find(id => id === answer.id) ? "radio selected" : "radio"}></div> */}
                                                <input type="radio" onChange={choiceAnswer} checked={user_answer.answers.find(id => id === answer.id) ? true : false} name={user_answer.question.id} id={user_answer.question.id + " " + answer.id} />
                                                <label htmlFor={user_answer.question.id + " " + answer.id}>{parse(answer.text)}</label>
                                            </li>
                                        :
                                            <li className="answer">
                                                {/* <div className={user_answer.answers.find(id => id === answer.id) ? "checkbox selected" : "checkbox"}></div> */}
                                                <input type="checkbox" />
                                                <span>{parse(answer.text)}</span>
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

    console.log(data);

    const first_questions = data.first_questions || [];
    const user_test_data = data.user_test_data || null;
    const subject = data.subject || null;
    const user_answer = data.user_answer || null;
    const user_answers = data.user_answers || [];

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
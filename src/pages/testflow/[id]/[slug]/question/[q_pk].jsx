import React from "react";
import { BACKEND_URL } from "../../../../../actions/types";
import TestLayout from "../../../../../layouts/test";
import parse from 'html-react-parser';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const TestFlowQuestionDetail = ({ first_questions, user_test_data, subject, user_answer, user_answers, access }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();

    const oneChoiceAnswer = async (id, q_id, a_id) => {

        try {
            const response = await fetch(`${BACKEND_URL}/testflow/user-answer/${id}/${q_id}/${a_id}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
            });

            router.push(router.asPath);
        } catch {
            console.log('Error!');
        }
    }

    const finishHandler = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/testflow/user-answer/${user_test_data.id}/finish/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
            })

            if (response.status == 200) {
                router.push(`/testflow/results/${user_test_data.id}`)
            } else {
                alert('Error!')
            }

        } catch (e) {
            console.log(e);
        }
    }

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    if(typeof window !== 'undefined' && (user_test_data && user_test_data.status)) {
        router.push(`/testflow/results/${user_test_data.id}`)
    }


    return (
        <TestLayout
            title={subject && router.locale === "ru" ? subject.title : subject.title_kk}
            user_test_data={user_test_data}
            user_answers={user_answers}
            user_answer={user_answer}
            subject={subject}
            first_questions={first_questions}
            finishHandler={finishHandler}
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
                                <span id="number"></span>
                                <span>{parse(user_answer.question.title || "")}</span>
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
                                            <li onClick={() => oneChoiceAnswer(user_test_data.id, user_answer.question.id, answer.id)} className={user_answer.answers.find(id => id === answer.id) ? "answer selected" : "answer"}>
                                                <div className={user_answer.answers.find(id => id === answer.id) ? "radio selected" : "radio"}>
                                                    <span></span>
                                                </div>
                                                <span>{parse(answer.text)}</span>
                                            </li>
                                        :
                                            <li onClick={() => oneChoiceAnswer(user_test_data.id, user_answer.question.id, answer.id)} className={user_answer.answers.find(id => id === answer.id) ? "answer selected" : "answer"}>
                                                <div className={user_answer.answers.find(id => id === answer.id) ? "checkbox selected" : "checkbox"}>
                                                    <span></span>
                                                </div>
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

    const first_questions = data.first_questions || [];
    const user_test_data = data.user_test_data || null;
    const subject = data.subject || null;
    const user_answer = data.user_answer || null;
    const user_answers = data.user_answers || [];

    if (user_test_data && user_test_data.status) {
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
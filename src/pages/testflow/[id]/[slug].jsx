import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import TestLayout from "../../../layouts/test";
import parse from 'html-react-parser';


const TestFlowQuizDetail = ({ user_test_data, subject, questions }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [slideIndex, setSlideIndex] = useState(1);
    const [answerId, setAnswer] = useState(null);

    const nextSlide = () => {
        if(slideIndex !== questions.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === questions.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    const choiceAnswer = id => {
        setAnswer(id);
    }

    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <TestLayout
            user_test_data={user_test_data}
            questions={questions}
            title={subject.title}
            moveDot={moveDot}
            slideIndex={slideIndex}
        >
            {isAuthenticated &&
                <div className="subject-testflow">
                    {questions.map((question, i) => {
                        return (
                            <div key={i} className={slideIndex === i + 1 ? "question-box show" : "question-box"}>
                                <div className="question-title">
                                    {question.context &&
                                        <div className="context">
                                            {parse(question.context.content)}
                                        </div>
                                    }
                                    <div className="q-head">
                                        <span id="number">{i+1}.</span>
                                        <span>{question.title}</span>
                                    </div>
                                    <div className="content">
                                        <span>{parse(question.content || "")}</span>
                                    </div>
                                </div>
                                <ol className="answers">
                                    {question.get_answers.map((answer, i) => {
                                        return (
                                            <li className={answer.id === answerId ? "answer selected" : "answer"} key={i} onClick={() => choiceAnswer(answer.id)}>
                                                <div className={answer.id === answerId ? "radio selected" : "radio"}></div>
                                                <span>{parse(answer.text)}</span>
                                            </li>
                                        )
                                    })}
                                </ol>
                                
                                <div className="btns">
                                    <button id="prev" onClick={prevSlide}>Алдынғы</button>
                                    <button id="next" onClick={nextSlide}>Келесі</button>
                                </div>
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
    const subject = data.subject || {};
    const questions = data.questions || [];

    return {
        props: {
            user_test_data,
            subject,
            questions
        }
    }
}


export default TestFlowQuizDetail;
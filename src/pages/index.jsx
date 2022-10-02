import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import MainLayout from "../layouts/main";
import { AiFillCaretRight, AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { RiErrorWarningLine } from 'react-icons/ri';


const Home = ({user_test_data}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }


    return (
        <MainLayout
            title={"Testflow - Онлайн платформа для тестового потока"}
            heading={"Мой тесты"}
        >
            {isAuthenticated &&
                <div className="main-container">
                    <div className="user-tests-data">
                        <div className="head">
                            <span id="id">ID</span>
                            <span id="test">Тест</span>
                            <span id="ls">Предметы</span>
                            <span id="ln">Язык</span>
                            <span id="time">Начало/Завершение</span>
                            <span id="status">Статус</span>
                        </div>
                        
                        {/* Reseults */}
                        {user_test_data.length > 0 ? user_test_data.map((data, i) => {
                            const datetime = new Date(data.start_time);
                            return (
                                <div className="results" key={i}>
                                    <span id="id">{data.id}</span>
                                    <span id="test">{data.test_category.test_name}</span>
                                    <span id="ls">
                                        {data.quizzes.map((quiz, i) => {
                                            return (
                                                <div 
                                                    style={{display: "inline-block", marginRight: "5px"}} key={i}>
                                                        {quiz.title}
                                                </div>
                                            )
                                        })}
                                    </span>
                                    <span id="ln">{data.test_category.ln}</span>
                                    <span id="time">
                                        {datetime.getHours() + ":" + datetime.getMinutes() + ":" + datetime.getSeconds()}
                                        -
                                        {datetime.getHours() + 4 + ":" + datetime.getMinutes() + ":" + datetime.getSeconds()}
                                    </span>
                                    <span id="status">
                                        {data.status === true ?
                                            <div className="finish">
                                                <p>Завершено</p> 
                                                <AiOutlineCheckCircle />
                                            </div> 
                                        : 
                                            <div className="process">
                                                <p>В процессе</p>
                                                <AiOutlineFieldTime />
                                                
                                                <Link href={`testflow/${data.id}`}>
                                                    <a className="goto-testflow"><AiFillCaretRight /></a>
                                                </Link>
                                            </div>
                                        }
                                    </span>

                                </div>
                            )
                        })
                    :
                        <div className="no-content">
                            <RiErrorWarningLine />
                            <span>
                                Әзірше бірде-бір тест тапсыру сессиясы ашылмаған.
                                Алғашқы тест тапсырып, өз біліміңді тексеріп көр!
                            </span>
                            <Link href={"/tests"}>
                                <a>Алғашқы тест сессиясын ашу</a>
                            </Link>                            
                        </div>
                    }
                    </div>
                </div>
            }
        </MainLayout>
    )
}


export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/`, context.req.cookies.access && config)
    const user_test_data = await res.json();

    return {
        props: {
            user_test_data
        }
    }
}

export default Home;
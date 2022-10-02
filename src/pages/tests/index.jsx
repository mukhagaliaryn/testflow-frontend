import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import MainLayout from "../../layouts/main";
import parse from 'html-react-parser';
import Link from "next/link";


const Tests = ({test_categories}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={"Testflow - все тесты"}
            heading={"Все тесты"}
        >
            {isAuthenticated &&
                <div className="main-container">
                    <div className="test-categories">
                        {test_categories.map((test, i) => {
                            return (
                                <div className="test-category" key={i}>
                                    <div className="head">
                                        <h4>{test.test_name}</h4>
                                        <Link href={`/tests/${test.slug}`}>
                                            <a>Выбрать</a>
                                        </Link>
                                    </div>
                                    <div className="description">
                                        {parse(test.description)}
                                    </div>
                                </div>
                            )
                        })}
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
    const res = await fetch(`${BACKEND_URL}/test-categories/`, context.req.cookies.access && config)
    const test_categories = await res.json();


    return {
        props: {
            test_categories
        }
    }
}

export default Tests;
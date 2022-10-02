import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from '../actions/auth';
import Sidebar from "../components/Sidebar";
import TestHeader from "../components/TestHeader";


const TestLayout = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta content={props.content} />
            </Head>
            <Script id="storage">
                {`
                    localStorage.setItem('currentPage', "${router.asPath}");
                `}
            </Script>
            <div id="root">
                <div className="testflow-wrapper">
                    <TestHeader />

                    <div className="testflow">
                        <Sidebar 
                            reverse_quizzes={props.reverse_quizzes} 
                            quizzes={props.quizzes}
                        />
                        
                        {/* =============================== */}
                        <div className="tesflow-data">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

TestLayout.defaultProps = {
    title: "Testflow",
    content: "Testflow - онлайн платформа для тестового потока"
}

export default TestLayout;
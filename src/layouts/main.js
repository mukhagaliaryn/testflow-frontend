import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { check_auth_status } from '../actions/auth';
import Header from "../components/Header";
import Navbar from "../components/Navbar";


const MainLayout = (props) => {

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
            <div id="root" >
                <div className="main-wrapper">
                    <Navbar />
                    
                    <div className="main">
                        <Header />
                        <div className="heading">
                            <h4>{props.heading}</h4>
                        </div>
                        {props.children}
                    </div>
                </div>

                {/* <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}>
                            <a>
                                {locale === "kz" ? "Қазашқа" : locale === "ru" ? "Русский" : null}
                            </a>
                        </Link>
                    ))}
                </nav> */}
            </div>
        </React.Fragment>
    )
}

MainLayout.defaultProps = {
    title: "Testflow",
    content: "Testflow - Онлайн платформа для тестового потока"
}

export default MainLayout;
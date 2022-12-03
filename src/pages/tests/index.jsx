import { useRouter } from "next/router";
import React from "react";
import { BACKEND_URL } from "../../actions/types";
import MainLayout from "../../layouts/main";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";


const TestDetail = ({ user_account, test_categories }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation("common"); 
    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={t("tests.header.title")}
            heading={t("tests.header.heading")}
            user_account={user_account}
        >
            {(isAuthenticated && (user_account && user_account.role === "STUDENT")) &&
                <div className="main-container">
                    <div className="test-categories">
                        {test_categories.map((test, i) => {
                            return (
                                <div className="test-category" key={i} onClick={() => router.push(`/tests/${test.slug}`)}>
                                    <h4>{test.category_name}</h4>
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
    const res = await fetch(`${BACKEND_URL}/subjects/tests/`, context.req.cookies.access && config)
    const data = await res.json();

    const user_account = data.user_account || null;
    const test_categories = data.test_categories || [];

    if (user_account.role === "ADMIN" || user_account.role === "TEACHER") {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user_account,
            test_categories
        }
    }
}


export default TestDetail;
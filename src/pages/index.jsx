import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../actions/types";
import MainLayout from "../layouts/main";
import StudentUserTestData from "../components/roles/student/UserTestData";
import AdminUserTestData from "../components/roles/admin/UserTestData";
import useTranslation from "next-translate/useTranslation";
import QuestionsList from "../components/roles/teacher/QuestionsList";


const Home = ({ user_test_data, user_account }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation("common");


    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={t("main.header.title")}
            heading={
                user_account && 
                user_account.role === "STUDENT" ? t("main.header.heading") 
                : user_account.role === "TEACHER" ? "Все вопросы"
                : user_account.role === "ADMIN" ? t("main.header.heading_admin")
                : null
            }
            user_account={user_account && user_account}
        >
            {isAuthenticated && user_account &&
                user_account.role === "STUDENT" ?
                    <StudentUserTestData user_test_data={user_test_data} />
                : user_account.role === "TEACHER" ?
                    <QuestionsList />
                : user_account && user_account.role === "ADMIN" ?
                    <AdminUserTestData user_test_data={user_test_data} />
                : null
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
    const res = await fetch(`${BACKEND_URL}/testflow/`, context.req.cookies.access && config)
    const data = await res.json();

    const user_test_data = data.user_test_data || [];
    const user_account = data.user_account || null

    return {
        props: {
            user_test_data,
            user_account
        }
    }
}

export default Home;
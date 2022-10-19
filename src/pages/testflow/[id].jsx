import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import TestLayout from "../../layouts/test";


const TestFlow = ({ user_test_data }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    const subject = user_test_data.subjects && user_test_data.subjects[0];

    return (
        <TestLayout
            user_test_data={user_test_data}
        >
            {isAuthenticated &&
                <div className="testflow-container">
                    <h1>{subject.title}</h1>
                    <Link href={`/testflow/${user_test_data.id}/${subject.slug}`}>
                        <a>Тестілеуді бастау</a>
                    </Link>
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
    const res = await fetch(`${BACKEND_URL}/testflow/${context.params.id}/`, context.req.cookies.access && config)
    
    const user_test_data = await res.json();

    return {
        props: {
            user_test_data,
        }
    }
}

export default TestFlow;
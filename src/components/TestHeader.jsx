import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";



const TestHeader = ({ questions, subject, user_test_data }) => {
    const user = useSelector(state => state.auth.user)
    const router = useRouter();
    
    return (
        <div className="test-header">
            <div className="intro-test-header">
                {questions.map((item, i) => {
                    return (
                        <Link key={i} href={`/testflow/${user_test_data.id}/${subject.slug}/question/${item.question.id}`}>
                            <a className={router.asPath === `/testflow/${user_test_data.id}/${subject.slug}/question/${item.question.id}` ? "index show" : "index"}>{i+1}</a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default TestHeader;
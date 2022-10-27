import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";



const TestHeader = ({ user_answers, subject, user_test_data }) => {
    const user = useSelector(state => state.auth.user)
    const router = useRouter();
    
    return (
        <div className="test-header">
            <div className="intro-test-header">
                {user_answers.map((item, i) => {
                    return (
                        <Link key={i} href={`/testflow/${user_test_data.id}/${subject.slug}/question/${item.question.id}`}>
                            <a className={router.asPath === `/testflow/${user_test_data.id}/${subject.slug}/question/${item.question.id}` ? "index show" : "index"}>
                                <span className={item.answers.length > 0 ? "number answered" : "number"}>{i+1}</span>
                            </a>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default TestHeader;
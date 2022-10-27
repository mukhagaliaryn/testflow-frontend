import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const Sidebar = ({ user_test_data, first_questions }) => {
    const router = useRouter();

    return (
        <div className="sidebar">
            <ul className="quizzes">
                {first_questions.length > 0 && first_questions.map((item, i) => {
                    return (
                        <li key={i} className={router.query.slug === item.subject.slug ? "active": ""}>
                            <Link href={`/testflow/${user_test_data.id}/${item.subject.slug}/question/${item.id}`}>
                                <a>{item.subject.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            
            <div className="finish">
                <Link href={"/"}>
                    <a className="finish-btn">Аяқтау</a>
                </Link>
            </div>

        </div>
    )
}

export default Sidebar;
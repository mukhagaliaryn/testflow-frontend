import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const Sidebar = ({ user_test_data }) => {
    const router = useRouter();
    const quizzes = user_test_data.quizzes || [];

    return (
        <div className="sidebar">
            <ul className="quizzes">
                {quizzes.length > 0 && quizzes.map((item, i) => {
                    return (
                        <li key={i} className={router.asPath === `/testflow/${user_test_data.id}/${item.slug}` ? "active": ""}>
                            <Link href={`/testflow/${user_test_data.id}/${item.slug}`}>
                                <a>{item.title}</a>
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
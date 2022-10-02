import Link from "next/link";
import React from "react";


const Sidebar = ({ reverse_quizzes, quizzes }) => {

    return (
        <div className="sidebar">
            <ul className="reverse-quizzes">
                {reverse_quizzes.length > 0 && reverse_quizzes.map((item, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/`}>
                                <a>{item.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <ul className="quizzes">
                {quizzes.length > 0 && quizzes.map((item, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/`}>
                                <a>{item.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Sidebar;
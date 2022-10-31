import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const Sidebar = ({ user_test_data, first_questions, finishHandler }) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    return (
        <div className="sidebar">

            
            {user_test_data && !user_test_data.status ?
                <>
                    <ul className="quizzes">
                        {first_questions.length > 0 && first_questions.map((item, i) => {
                            return (
                                <li key={i} className={router.query.slug === item.subject.slug ? "active": ""}>
                                    <Link href={`/testflow/${user_test_data.id}/${item.subject.slug}/question/${item.id}`}>
                                        <a>{router.locale === "ru" ? item.subject.title : item.subject.title_kk}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                            
                    <div className="finish" onClick={finishHandler}>
                        <span className="finish-btn" >{t("navbar.finished")}</span>
                    </div>
                </>
            :
                <>
                    <ul className="quizzes">
                        {first_questions.length > 0 && first_questions.map((item, i) => {
                            return (
                                <li key={i} className={router.query.slug === item.subject.slug ? "active": ""}>
                                    <Link href={`/testflow/results/${user_test_data.id}/${item.subject.slug}/question/${item.id}`}>
                                        <a>{router.locale === "ru" ? item.subject.title : item.subject.title_kk}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    
                    <div className="finish">
                        <Link href={"/"}>
                            <a className="finish-btn" >Венуться в главный</a>
                        </Link>
                    </div>
                </>      
            }
        </div>
    )
}

export default Sidebar;
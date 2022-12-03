import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretRight, AiOutlineCheckCircle, AiOutlineFieldTime } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import Moment from "react-moment";


const StudentUserTestData = ({ user_test_data }) => {
    const router = useRouter();
    const { t } = useTranslation("common");


    return (
        <div className="main-container">
            <div className="user-tests-data">
                <div className="head student">
                    <span id="id">{t("main.head.id")}</span>
                    <span id="test">{t("main.head.test_type")}</span>
                    <span id="ls">{t("main.head.ls")}</span>
                    <span id="ln">{t("main.head.ln")}</span>
                    <span id="time">{t("main.head.time")}</span>
                    <span id="status">{t("main.head.status")}</span>
                </div>
                
                {/* Reseults */}
                {user_test_data.length > 0 ? user_test_data.map((data, i) => {
                    return (
                        <div className="results student" key={i} onClick={() => router.push(data.status ? `/testflow/results/${data.id}` : `testflow/${data.id}`)}>
                            <span id="id">{data.id}</span>
                            <span id="test">{router.locale === "ru" ? data.test_type.category_name : data.test_type.category_name_kk}</span>
                            <span id="ls">
                                {data.subjects.map((subject, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            {!subject.is_reserve_and_required && 
                                                <div className="test-subject">
                                                    {subject.title}
                                                </div>
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </span>
                            <span id="ln">{data.ln === 'KZ' ? "Қазақша" : "Русский"}</span>
                            <span id="time">
                                <Moment format="HH:MM:SS" date={data.start_time} /> - 
                                {data.finish_time ?
                                    <Moment format="HH:MM:SS" date={data.finish_time} />                            
                                :
                                    "..."
                                }
                            </span>
                            <span id="status">
                                {data.status === true ?
                                    <div className="finish">
                                        <p>{t("main.results.finish")}</p> 
                                        <AiOutlineCheckCircle />
                                    </div> 
                                : 
                                    <div className="process">
                                        <p>{t("main.results.process")}</p>
                                        <AiOutlineFieldTime />
                                        
                                        <Link href={`testflow/${data.id}`}>
                                            <a className="goto-testflow"><AiFillCaretRight /></a>
                                        </Link>
                                    </div>
                                }
                            </span>
                        </div>
                    )
                })
            :
                <div className="no-content">
                    <RiErrorWarningLine />
                    <span>{t("main.no-content.label")}</span>
                    <Link href={"/tests"}>
                        <a>{t("main.no-content.link")}</a>
                    </Link>                            
                </div>
            }
            </div>
        </div>
    )
}

export default StudentUserTestData;
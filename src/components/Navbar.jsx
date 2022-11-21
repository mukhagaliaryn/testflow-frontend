import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GrUpgrade } from 'react-icons/gr';
import { TbLayoutList } from 'react-icons/tb';
import { RiHome5Line } from 'react-icons/ri';
import useTranslation from "next-translate/useTranslation";


const Navbar = ({ user_account }) => {
    const router = useRouter();
    const { t } = useTranslation("common");


    return (
        <div className="navbar">
            <div className="workspace" onClick={() => router.push('/')}>
                <div className="logo">
                    <Image src={"/images/flow.png"} width={100} height={100} />
                </div>
                <h2 className="brandname">TestFlow</h2>
            </div>

            <ul className="route-list">
                <li className={router.pathname === "/" ? "active": ""}>
                    <Link href={"/"}>
                        <a><RiHome5Line />{t("navbar.main")}</a>
                    </Link>
                </li>
                {(user_account && user_account.role === "STUDENT") &&
                    <li className={router.pathname === "/tests" ? "active": ""}>
                        <Link href={"/tests"}>
                            <a><TbLayoutList />{t("navbar.tests")}</a>
                        </Link>
                    </li>
                }
            </ul>

            {/* <div className="upgrade-plan">
                <GrUpgrade />
                <small>
                    Тегін тарифтегі мүмкіндіктер бітті ме? <br />
                    Premium тарифіндегі жаңа мүмкіндіктермен өзіңді дамыт!
                </small>
                <Link href={"/plans"}>
                    <a>Тарифтер</a>
                </Link>  
            </div> */}
        </div>
    )
}

export default Navbar;
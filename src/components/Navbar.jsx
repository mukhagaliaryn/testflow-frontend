import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GrUpgrade } from 'react-icons/gr';
import { TbLayoutList } from 'react-icons/tb';
import { RiHome5Line } from 'react-icons/ri';
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";


const Navbar = ({ user_account }) => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const user = useSelector(state => state.auth.user)

    return (
        <div className="navbar">
            <div className="workspace" onClick={() => router.push('/')}>
                <div className="logo">
                    <Image src={"/images/flow.png"} width={100} height={100} alt="Image"/>
                </div>
                {user &&
                    <div className="username">
                        <h4>{user.full_name}</h4>
                        <small>{user.iin}</small>
                    </div>
                }
            </div>
            <ul className="route-list">
                <li className={router.pathname === "/" ? "active": ""}>
                    <Link href={"/"}>
                        <span><RiHome5Line />{t("navbar.main")}</span>
                    </Link>
                </li>
                {(user_account && user_account.role === "STUDENT") &&
                    <li className={router.pathname === "/tests" ? "active": ""}>
                        <Link href={"/tests"}>
                            <span><TbLayoutList />{t("navbar.tests")}</span>
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
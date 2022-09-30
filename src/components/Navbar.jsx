import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GrUpgrade } from 'react-icons/gr';
import { TbLayoutList } from 'react-icons/tb';
import { RiErrorWarningLine, RiHome5Line } from 'react-icons/ri';
import { useSelector } from "react-redux";


const Navbar = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user)


    return (
        <div className="navbar">
            <div className="workspace">
                <div className="logo">
                    <Image src={"/images/flow.png"} width={100} height={100} />
                </div>
                {user &&
                <div className="user">
                    <h4>{user.first_name + " " + user.last_name}</h4>
                    <small>{user.iin}</small>
                </div>}
            </div>

            <ul className="route-list">
                <li className={router.pathname === "/" ? "active": ""}>
                    <Link href={"/"}>
                        <a><RiHome5Line />Басты бет</a>
                    </Link>
                </li>
                <li className={router.pathname === "/tests" ? "active": ""}>
                    <Link href={"/tests"}>
                        <a><TbLayoutList />Тесты</a>
                    </Link>
                </li>
            </ul>

            <div className="upgrade-plan">
            <GrUpgrade />
                <span>
                    Тегін тарифтегі мүмкіндіктер бітті ме? <br />
                    Premium тарифіндегі жаңа мүмкіндіктермен өзіңді дамыт!
                </span>
                <Link href={"/plans"}>
                    <a>Тарифтер</a>
                </Link>  
            </div>
        </div>
    )
}

export default Navbar;
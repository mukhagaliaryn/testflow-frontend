import { AnimatePresence } from "framer-motion";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsSearch,BsChevronDown, BsBell } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth';
import Dropdown from "./Dropdown";
import PushDown from "./PushDown";



const Header = ({user_account}) => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const [push, setPush] = useState(false);
    const { t } = useTranslation("common");


    const toggleDropdown = () => setDropdown(!dropdown);
    const togglePushDropdown = () => setPush(!push);

    const logoutHandler = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(logout())
        }
    }
    
    return (
        <div className="header">
            <div className="intro-header">
                <form className="search">
                    <div className="input-group">
                        <BsSearch />
                        <input type="text" name="" placeholder={t("header.search")} />
                    </div>
                </form>
                <div className="accounts">
                    {user_account && (user_account.role === "STUDENT" ? 
                        <Link href="/tests">
                            <a className="goto">{t("header.account.go-to")}</a>
                        </Link>
                    :
                        user_account.role === "TEACHER" ? 
                            <Link href="/question">
                                <a className="goto">{t("header.account.add-test")}</a>
                            </Link>
                    :    
                        null
                    )}
                    
                    <span>hello</span>
                    <span className="push" onClick={togglePushDropdown}><BsBell /></span>

                    <span className="user" onClick={toggleDropdown}>
                        <div className="ava">
                            <Image src={user && user.image ? user.image : '/images/ava.png'} width={100} height={100} />
                        </div>
                        <div className="down"><BsChevronDown /></div>
                    </span>
                    <AnimatePresence>
                        {dropdown &&
                            <Dropdown toggleDropdown={toggleDropdown} user={user} logout={logoutHandler} />
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {push &&
                            <PushDown togglePushDropdown={togglePushDropdown} />
                        }
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}

export default Header;
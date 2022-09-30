import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { BsSearch,BsChevronDown, BsBell } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth';
import Dropdown from "./Dropdown";
import PushDown from "./PushDown";



const Header = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const [push, setPush] = useState(false);



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
                        <input type="text" name="" placeholder="Ищи тесты, результаты и другие..." />
                    </div>
                </form>
                <div className="accounts">
                    <span className="push" onClick={togglePushDropdown}><BsBell /></span>

                    <span className="user" onClick={toggleDropdown}>
                        <div className="ava">
                            <Image src={'/images/ava.jpg'} width={100} height={100} />
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
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BiUser } from 'react-icons/bi';
import { GoSettings } from 'react-icons/go';
import { BsFullscreenExit } from 'react-icons/bs';


const Dropdown = ({user, toggleDropdown, logout }) => {

    return (
        <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dropdown-container"
        >
            <div className="user-drop">
                <div className="image">
                    <Image src={user && user.image ? user.image : '/images/ava.png'} width={100} height={100} />
                </div>
                {user &&
                <div className="username">
                    <small>{user.email}</small>
                    <small>{user.iin}</small>
                </div>}
            </div>
            <ul>
                <li>
                    <Link href={`/accounts/${user.id}`}>
                        <a>
                            <BiUser />
                            <span>Профиль</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/"}>
                        <a>
                            <GoSettings />
                            <span>Настройка</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <span onClick={logout}>
                        <BsFullscreenExit />
                        <span>Выйти</span>
                    </span>
                </li>
            </ul>
        </motion.div>
    )
}

export default Dropdown;
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BiUser } from 'react-icons/bi';
import { GoSettings } from 'react-icons/go';
import { BsFullscreenExit } from 'react-icons/bs';
import useTranslation from "next-translate/useTranslation";


const Dropdown = ({user, toggleDropdown, logout }) => {
    const { t } = useTranslation("common");

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
                    <Image src={(user && user.image) ? user.image : '/images/ava.png'} width={100} height={100} alt="Image"/>
                </div>
                {user &&
                <div className="username">
                    <h4>{user.full_name}</h4>
                    <small>{user.email}</small>
                    <small>{user.iin}</small>
                </div>}
            </div>
            <ul>
                <li>
                    <Link href={`/accounts/user/${user.id}`}>
                        <span>
                            <BiUser />
                            <span>Профиль</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href={"/"}>
                        <span>
                            <GoSettings />
                            <span>{t("header.account.setting")}</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <span onClick={logout}>
                        <BsFullscreenExit />
                        <span>{t("header.account.logout")}</span>
                    </span>
                </li>
            </ul>
        </motion.div>
    )
}

export default Dropdown;
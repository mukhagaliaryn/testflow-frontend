import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { motion } from "framer-motion"
import { useRouter } from "next/router";
import useTranslation from 'next-translate/useTranslation'


const AccountsLayout = (props) => {
    const router = useRouter();
    const { t } = useTranslation("common");

    const variants = {
        hidden: { opacity: 0, x: 0 },
        visible: { opacity: 1, x: 20 },
    }

    const variants_form = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <React.Fragment>
            <Head>
                <title>{props.title}</title>
                <meta content={props.content} />
            </Head>
            <div id="root">
                <div className="accounts-wrapper">
                    <div className="features">
                        <div className="intro-features">
                            <motion.div className="logo"
                                initial="hidden" 
                                animate="visible" 
                                variants={variants}
                                transition={{duration: .3}}
                            >
                                <Link href={"/"}>
                                    <a>
                                        <div className="image">
                                            <Image src={'/images/flow.png'} width={100} height={100}/>
                                        </div>
                                        <span>testflow</span>
                                    </a>
                                </Link>
                            </motion.div>

                            <ul>
                                <motion.li
                                    initial="hidden" 
                                    animate="visible" 
                                    variants={variants}
                                    transition={{duration: .3}}
                                >
                                    <BsFillCheckCircleFill />
                                    <div className="title">
                                        <h3>{t("accounts.features.h1")}</h3>
                                        <p>{t("accounts.features.p1")}</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial="hidden" 
                                    animate="visible" 
                                    variants={variants}
                                    transition={{duration: .6}}
                                >
                                    <BsFillCheckCircleFill />
                                    <div className="title">
                                        <h3>{t("accounts.features.h2")}</h3>
                                        <p>{t("accounts.features.p2")}</p>
                                    </div>
                                </motion.li>
                                <motion.li
                                    initial="hidden" 
                                    animate="visible" 
                                    variants={variants}
                                    transition={{duration: 1}}
                                >
                                    <BsFillCheckCircleFill />
                                    <div className="title">
                                        <h3>{t("accounts.features.h3")}</h3>
                                        <p>{t("accounts.features.p3")}</p>
                                    </div>
                                </motion.li>
                            </ul>
                        </div>
                    </div>

                    <div className="accounts-container">
                        <motion.div className="intro-accounts-container"
                            initial="hidden" 
                            animate="visible" 
                            variants={variants_form}
                            transition={{duration: .5}}
                        >
                            {props.children}
                        </motion.div>
                    </div>
                </div>

                <nav className="i18next">
                    {router.locales.map(locale => (
                        <Link href={router.asPath} locale={locale} key={locale}>
                            <a>
                                {locale === "kz" ? "Қазашқа" : locale === "ru" ? "Русский" : null}
                            </a>
                        </Link>
                    ))}
                </nav>
            </div>
        </React.Fragment>
    )
}


AccountsLayout.defaultProps = {
    title: "Testflow",
    content: "Testflow - Онлайн платформа для тестового потока"
}


export default AccountsLayout;
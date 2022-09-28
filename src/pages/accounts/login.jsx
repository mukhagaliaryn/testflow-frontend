import React, { useEffect } from "react";
import AccountsLayout from "../../layouts/accounts";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, login } from '../../actions/auth';
import { BsFillKeyFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUnlock } from 'react-icons/fa';
import useTranslation from "next-translate/useTranslation";



const Login = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(login(data.iin, data.password));
        }
    };

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push(localStorage.getItem('currentPage') || "/");

    return (
        <AccountsLayout
            title={t("accounts.login.heading")}
        >
            <h1>{t("accounts.login.heading")}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.login.form.iin.label")}</label>
                    <div className="input">
                        <BsFillKeyFill />
                        <input type="text" {...register("iin")} placeholder={t("accounts.login.form.iin.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.login.form.password.label")}</label>
                    <div className="input">
                        <RiLockPasswordFill />
                        <input type="password" {...register("password")} placeholder={t("accounts.login.form.password.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group submit">
                    <Link href={"/accounts/password-reset"}>
                        <a>{t("accounts.forgot_password")}</a>
                    </Link>
                    <div className="input">
                        {loading ? 
                            <span>{t("accounts.loading")}</span> 
                        : 
                            <button><FaUnlock/>{t("accounts.enter")}</button>}
                    </div>
                </div>
            </form>
            <div className="more-link">
                <span>{t("accounts.is_register")}</span>
                <Link href={"/accounts/register"}>
                    <a>{t("accounts.register_link")}</a>
                </Link>
            </div>
        </AccountsLayout>
    )
}

export default Login
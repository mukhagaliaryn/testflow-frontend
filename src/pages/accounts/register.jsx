import React, { useEffect } from "react";
import AccountsLayout from "../../layouts/accounts";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, signup } from "../../actions/auth";
import useTranslation from "next-translate/useTranslation";
import { BsFillKeyFill, BsFillCalendarDateFill, BsTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";



const Register = () => {
    const { register, handleSubmit } = useForm();
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const register_success = useSelector(state => state.auth.register_success);
    const { t } = useTranslation("common");


    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(signup(data.iin, data.email, data.full_name, data.birthday, data.phone, data.password, data.re_password));
    };

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);

    if (typeof window !== "undefined" && isAuthenticated)
        router.push(localStorage.getItem('currentPage') || "/");


    if (register_success)
        router.push('/accounts/login');
    

    return (
        <AccountsLayout
            title={t("accounts.register.heading")}
        >
            <h1>{t("accounts.register.heading")}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.iin.label")}</label>
                    <div className="input">
                        <BsFillKeyFill />
                        <input type="text" {...register("iin")} placeholder={t("accounts.register.form.iin.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.email.label")}</label>
                    <div className="input">
                        <HiMail />
                        <input type="email" {...register("email")} placeholder={t("accounts.register.form.email.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.full_name.label")}</label>
                    <div className="input">
                        <FaUser />
                        <input type="text" {...register("full_name")} placeholder={t("accounts.register.form.full_name.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.birthday.label")}</label>
                    <div className="input">
                        <BsFillCalendarDateFill />
                        <input type="date" {...register("birthday")} placeholder={t("accounts.register.form.birthday.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.phone.label")}</label>
                    <div className="input">
                        <BsTelephoneFill />
                        <input type="phone" {...register("phone")} placeholder={t("accounts.register.form.phone.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.password.label")}</label>
                    <div className="input">
                        <RiLockPasswordFill />
                        <input type="password" {...register("password")} placeholder={t("accounts.register.form.password.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.register.form.re_password.label")}</label>
                    <div className="input">
                        <RiLockPasswordFill />
                        <input type="password" {...register("re_password")} placeholder={t("accounts.register.form.re_password.placeholder")} required/>
                    </div>
                </div>
                <div className="input-group submit">
                    <div className="input full">
                        <button>
                            {loading ? 
                                <span>{t("accounts.loading")}</span>
                            :
                                <>
                                    <FaUser /> {t("accounts.register.form.submit")}
                                </>
                            }
                        </button>
                    </div>
                </div>
            </form>

            <div className="more-link">
                <span>{t("accounts.is_accounts")}</span>
                <Link href={"/accounts/login"}>
                    <span>{t("accounts.enter")}</span>
                </Link>
            </div>
        </AccountsLayout>
    )
}

export default Register
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import AccountsLayout from "../../layouts/accounts";
import { HiMail } from 'react-icons/hi';
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { check_auth_status, passwordReset } from "../../actions/auth";



const schema = yup.object().shape({
    email: yup.string()
        .email('Электронная почта должна быть действительной')
        .required('Электронная почта требуется'),
});


const PasswordReset = () => {
    const { t } = useTranslation("common");
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });


    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(passwordReset(data.email));
            router.push("/accounts/login")
        }
    };

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push(localStorage.getItem("currentPage") || "/");


    return (
        <AccountsLayout
            title={t("accounts.password-reset.heading")}
        >
            <h1>{t("accounts.password-reset.heading")}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.password-reset.form.email.label")}</label>
                    <div className="input">
                        <HiMail />
                        <input type="email" {...register("email")} placeholder={t("accounts.password-reset.form.email.placeholder")} />
                    </div>
                    {errors["email"] ? <p>{errors["email"].message}</p>: null}
                </div>
                <div className="input-group submit">
                    <Link href="/accounts/login">
                        <span>{t("accounts.back")}</span>
                    </Link>
                    <div className="input">
                        <button>
                            {loading ? 
                                <span>{t("accounts.loading")}</span> 
                            :
                            <>
                                <HiMail /> {t("accounts.password-reset.form.submit")} 
                            </>}
                        </button>
                    </div>
                </div>
            </form>
        </AccountsLayout>
    )
}

export default PasswordReset;
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { check_auth_status, reset_password_confirm } from "../../../../actions/auth";
import AccountsLayout from "../../../../layouts/accounts";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    new_password: yup.string()
        .required('Необходим пароль')
        .min(6, 'Пароль должен состоять из 6 или более символов'),
    re_new_password: yup.string()
        .required('Необходим подтверждение пароль')
        .min(6, 'Пароль должен состоять из 6 или более символов')
        .oneOf([yup.ref('new_password'), null], 'Пароли должны совпадать'),
});


const PasswordResetConfirm = () => {
    const router = useRouter()
    const loading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const { t } = useTranslation("common");

    const { register, formState:{ errors }, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(reset_password_confirm(router.query.uid, router.query.token, data.new_password, data.re_new_password));
        }
        router.push('/accounts/login')
    };


    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(check_auth_status());

    }, [dispatch]);


    if (typeof window !== "undefined" && isAuthenticated)
        router.push("/");

    return (
        <AccountsLayout
            title={t("accounts.confirm.heading")}
        >
            <h1>{t("accounts.confirm.heading")}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.confirm.form.new_password.label")}</label>
                    <div className="input">
                        <RiLockPasswordFill />
                        <input type="password" {...register("new_password")} placeholder={t("accounts.confirm.form.new_password.placeholder")}/>
                    </div>
                    {errors["new_password"] ? <p>{errors["new_password"].message}</p>: null}
                </div>
                <div className="input-group">
                    <label htmlFor="">{t("accounts.confirm.form.re_new_password.label")}</label>
                    <div className="input">
                        <RiLockPasswordFill />
                        <input type="password" {...register("re_new_password")} placeholder={t("accounts.confirm.form.re_new_password.placeholder")}/>
                    </div>
                    {errors["re_new_password"] ? <p>{errors["re_new_password"].message}</p>: null}
                </div>
                <div className="input-group submit">
                    <div className="input full">
                        <button>
                            {loading ? 
                                <span>{t("accounts.loading")}</span>  
                            :
                            <>
                                <FaLock /> {t("accounts.confirm.form.submit")}
                            </>}
                        </button>
                    </div>
                </div>
            </form>
        </AccountsLayout>
    )
}

export default PasswordResetConfirm;
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../../../actions/types";
import MainLayout from "../../../layouts/main";
import { AiFillLock } from 'react-icons/ai';
import { setAlert } from "../../../actions/alert";


const Profile = ({ user_account, access }) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { t } = useTranslation("common");

    const { register, handleSubmit } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, } = useForm();

    const dispatch = useDispatch();


    const user = user_account.user;
    const tenant = user_account.tenant;


    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${BACKEND_URL}/accounts/user/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
                body: JSON.stringify(data)
            });

            if (response.status == 200) {
                router.push(`/accounts/user/${user.id}`);
                dispatch(setAlert("Профиль сохранено!", "success"));
            } else {
                dispatch(setAlert("Что-то пошло не так. Повторите пожалуйста!", "error"));
            }
        } catch {
            console.log(e);
        }
    }

    const handlePasswordChange = async (data) => {
        try {
            const response = await fetch(`${BACKEND_URL}/accounts/password-change/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access}`
                },
                body: JSON.stringify(data)
            });

            if (response.status == 200) {
                dispatch(setAlert("Пароль изменено!", "success"));
                router.reload();
            } else {
                dispatch(setAlert("Что-то пошло не так. Повторите пожалуйста!", "error"));
            }
        } catch {
            console.log(e);
        }
    }


    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={user && user.full_name}
            heading={user && user.full_name}
            user_account={user_account}
        >
            {isAuthenticated &&
                <div className="profile-container">
                    {user && tenant &&
                        <React.Fragment>
                            <div className="user-personal-name">
                                <div className="image">
                                    <Image src={user.image ? user.image : '/images/ava.png'} width={100} height={100} />
                                </div>
                                <div className="user-name">
                                    <h2>{user.full_name}</h2>
                                    <span id="iin">{user.iin}</span>
                                    <span id="role">{user_account.role}</span>
                                    <small><AiFillLock /> {tenant.tenant_name}</small>
                                </div>
                            </div>
                            
                            {/* Profile edit */}
                            <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group">
                                    <label htmlFor="">{t("accounts.register.form.iin.label")}</label>
                                    <input 
                                        type="text" {...register("iin")} 
                                        placeholder={t("accounts.register.form.iin.placeholder")} 
                                        defaultValue={user.iin}
                                        disabled
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">{t("accounts.register.form.email.label")}</label>
                                    <input 
                                        type="email" {...register("email")} 
                                        placeholder={t("accounts.register.form.email.placeholder")} 
                                        defaultValue={user.email}
                                        disabled
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">{t("accounts.register.form.phone.label")}</label>
                                    <input 
                                        type="phone" {...register("phone")} 
                                        placeholder={t("accounts.register.form.phone.placeholder")} 
                                        defaultValue={user.phone}
                                        disabled
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">{t("accounts.register.form.full_name.label")}</label>
                                    <div className="input">
                                        <input 
                                            type="text" {...register("full_name")} 
                                            placeholder={t("accounts.register.form.full_name.placeholder")} 
                                            defaultValue={user.full_name}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">{t("accounts.register.form.birthday.label")}</label>
                                    <div className="input">
                                        <input 
                                            type="date" {...register("birthday")} 
                                            placeholder={t("accounts.register.form.birthday.placeholder")} 
                                            defaultValue={user.birthday}   
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <select defaultValue={user.city} id="city" {...register("city")} required>
                                        <option value="NOT_DEFINED">Не определено</option>
                                        <option value="SHYMKENT">Шымкент</option>
                                        <option value="ALMATY">Алматы</option>
                                        <option value="NUR_SULTAN">Нур-Сұлтан</option>
                                    </select>
                                </div>

                                <div className="input-group submit">
                                    <div className="input full">
                                        <button>Сохранить</button>
                                    </div>
                                </div>
                            </form>

                            {/* Password change */}
                            <form className="password-change" onSubmit={handleSubmit2(handlePasswordChange)}>
                                <div className="input-group">
                                    <label htmlFor="">Старый пароль</label>
                                    <input type="password" {...register2('old_password')} placeholder="Введите старый пароль..." required/>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">Новый пароль</label>
                                    <input type="password" {...register2('new_password')} placeholder="Введите новый пароль..." required/>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="">Подтвердить пароля</label>
                                    <input type="password" {...register2('re_new_password')} placeholder="Подтвердите новый пароль..." required/>
                                </div>

                                <div className="input-group submit">
                                    <div className="input full">
                                        <button>Сохранить</button>
                                    </div>
                                </div>
                            </form>
                        </React.Fragment>
                    }
                </div>
            }
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${context.req.cookies.access}`
        }
    }
    const res = await fetch(`${BACKEND_URL}/accounts/user/`, context.req.cookies.access && config)
    const user_account = await res.json();

    return {
        props: {
            user_account,
            access: context.req.cookies.access
        }
    }
}


export default Profile;
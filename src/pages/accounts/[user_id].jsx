import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../../actions/types";
import MainLayout from "../../layouts/main";


const Profile = ({user}) => {
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    
    if(typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/accounts/login')
    }

    return (
        <MainLayout
            title={user.first_name + " " + user.last_name + " " + user.father_name}
            heading={user.first_name + " " + user.last_name + " " + user.father_name}
        >
            {isAuthenticated &&
                <div className="profile-container">
                    {user &&
                        <div className="user-personal-name">
                            <div className="image">
                                <Image src={user.image ? user.image : '/images/ava.png'} width={100} height={100} />
                            </div>
                            <div className="user-name">
                                <h2>{user.first_name + " " + user.last_name + " " + user.father_name}</h2>
                                <span>{user.iin}</span>
                                <span>{user.email}</span>
                            </div>
                        </div>
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
    const res = await fetch(`${BACKEND_URL}/auth/users/me/`, context.req.cookies.access && config)
    const user = await res.json();

    return {
        props: {
            user
        }
    }
}


export default Profile;
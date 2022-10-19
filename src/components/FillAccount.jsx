import React from "react";
import { BACKEND_URL } from "../actions/types";


const FillAccount = ({ user }) => {
    console.log(user);
    return (
        <div className="fill-account">
            <h1>Аккаунтты толтыру</h1>
            <form>
                <div className="input-group">
                    <label htmlFor="">Город</label>
                    <select>
                        <option value="">Шымкент</option>
                        <option value="">Алматы</option>
                        <option value="">Астана</option>
                    </select>

                    <div className="input-group">
                        <label htmlFor="">День рождение</label>
                        <input type="date" />
                    </div>
                    
                    <div className="input-group submit">
                        <button>Жалғастыру</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default FillAccount;
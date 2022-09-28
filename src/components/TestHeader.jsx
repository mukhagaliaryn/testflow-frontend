import React from "react";
import { useSelector } from "react-redux";



const TestHeader = () => {
    const user = useSelector(state => state.auth.user)

    
    return (
        <div className="header">
            <div className="intro-header">
                
            </div>
        </div>
    )
}

export default TestHeader;
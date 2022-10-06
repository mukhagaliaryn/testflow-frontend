import React from "react";
import { useSelector } from "react-redux";



const TestHeader = ({ questions }) => {
    const user = useSelector(state => state.auth.user)
    
    return (
        <div className="test-header">
            <div className="intro-test-header">
                {questions.map((item, i) => {
                    return (
                        <div key={i} className="index">
                            <span>{i+1}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TestHeader;
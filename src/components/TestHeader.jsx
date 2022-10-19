import React from "react";
import { useSelector } from "react-redux";



const TestHeader = ({ questions, moveDot, slideIndex }) => {
    const user = useSelector(state => state.auth.user)

    return (
        <div className="test-header">
            <div className="intro-test-header">
                {questions.map((item, i) => {
                    return (
                        <div key={i} className={slideIndex === i+1 ? "index show": "index"} onClick={() => moveDot(i+1)}>
                            <span>{i+1}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TestHeader;
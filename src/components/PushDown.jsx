import React from "react";
import { motion } from "framer-motion";
import { IoIosClose } from 'react-icons/io';


const PushDown = ({ togglePushDropdown }) => {
    return (
        <motion.div 
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="push-container"
        >
            <div className="push-heading">
                <span>Push-уведомления</span>
                <span className="close" onClick={togglePushDropdown}><IoIosClose/></span>
            </div>
        </motion.div>
    )
}

export default PushDown;
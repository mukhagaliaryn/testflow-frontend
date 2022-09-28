import React from "react";
import { motion } from "framer-motion";


const PushDown = () => {
    return (
        <motion.div 
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 10, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="push-container"
        >
            <div className="heading">
                <h4>Push-уведомления</h4>
            </div>
        </motion.div>
    )
}

export default PushDown;
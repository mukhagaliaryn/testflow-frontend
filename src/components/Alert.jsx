import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdOutlineError } from 'react-icons/md';


const Alert = () => {
    const alerts = useSelector(state => state.alert)
    
    // For motion
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="alert-container">
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <motion.div key={alert.id} className='alert'    
                    initial="hidden" 
                    animate="visible" 
                    variants={item} 
                    transition={{duration: .5, repeat: 1, repeatDelay: 3, repeatType: "reverse",}}
                >
                    {alert.alertType === "success" ? 
                            <span className="success">
                                <BsFillCheckCircleFill />
                            </span>
                         : 
                            <span className="error">
                                <MdOutlineError />
                            </span>
                        }
                    <small>{ alert.msg }</small>
                </motion.div>
            ))}
        </div>
    )
}

export default Alert;
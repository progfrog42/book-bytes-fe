import {useEffect, useState} from "react";
import {motion, useSpring} from "framer-motion";
import style from "@/styles/components/Notifications.module.css";
import {useSelector} from "react-redux";
import {useActions} from "@/hooks/useActions";

const Notifications = () => {

    const notifications = useSelector(state => state.notifications._notifications)

    const [array, setArray] = useState([])

    useEffect(() => {
        if (notifications.length >= array.length || notifications.length === 0) {
            setArray(notifications)
        }
    }, [notifications])

    return (
        <div className={style.list}>
            {array.map(el =>
                <Notification key={el.id} notification={el} array={notifications} />
            )}
        </div>
    );
};

const Notification = ({notification}) => {

    const [x, setX] = useState("0")
    const height = useSpring(100)
    const [display, setDisplay] = useState("flex")

    const {deleteNotification} = useActions()

    if (typeof(window) !== "undefined") {
        useEffect(() => {
            const width = window.innerWidth
            if (width > 991 && width <= 1199) {
                height.set(80)
            } else if (width > 575 && width <= 991) {
                height.set(70)
            } else if (width <= 575) {
                height.set(77)
            }
        }, [window])
    }

    useEffect(() => {
        setTimeout(() => {
            closeNotification()
        }, 8000)
    }, [])

    const closeNotification = () => {
        setX("-110%")
        setTimeout(() => {
            height.set(0)
            setTimeout(() => {
                setDisplay("none")
                deleteNotification(notification)
            }, 400)
        }, 1500)
    }

    return (
        <motion.div
            key={notification.id}
            animate={{
                display,
            }}
            style={{
                height,
            }}
            transition={{
                type: "spring",
                layout: { duration: 0.5 },
            }}
            className={style.wrap}
        >
            <motion.div
                initial={{x: "-110%", opacity: 0}}
                animate={{
                    x,
                    opacity: 1,
                    display,
                }}
                transition={{
                    type: "spring",
                    layout: { duration: 0.5 },
                    bounce: 0,
                }}
                className={style.notification + ' ' + (notification.type === 1 ? style.error : '')}
            >
                <div className={style.up_line}>
                    <p className={style.head}>{notification.head}</p>
                    <svg onClick={closeNotification} className={style.close + ' ' + (notification.type === 1 ? style.white : '')} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 17.4L9.00005 24.4C8.80005 24.6 8.56672 24.7 8.30005 24.7C8.03338 24.7 7.80005 24.6 7.60005 24.4C7.40005 24.2 7.30005 23.9667 7.30005 23.7C7.30005 23.4333 7.40005 23.2 7.60005 23L14.6 16L7.60005 9C7.40005 8.8 7.30005 8.56667 7.30005 8.3C7.30005 8.03334 7.40005 7.8 7.60005 7.6C7.80005 7.4 8.03338 7.3 8.30005 7.3C8.56672 7.3 8.80005 7.4 9.00005 7.6L16 14.6L23 7.6C23.2 7.4 23.4334 7.3 23.7 7.3C23.9667 7.3 24.2 7.4 24.4 7.6C24.6 7.8 24.7 8.03334 24.7 8.3C24.7 8.56667 24.6 8.8 24.4 9L17.4 16L24.4 23C24.6 23.2 24.7 23.4333 24.7 23.7C24.7 23.9667 24.6 24.2 24.4 24.4C24.2 24.6 23.9667 24.7 23.7 24.7C23.4334 24.7 23.2 24.6 23 24.4L16 17.4Z"/>
                    </svg>
                </div>
                <p className={style.text}>{notification.text}</p>
            </motion.div>
        </motion.div>
    );
};

export default Notifications;
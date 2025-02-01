import styles from "@/styles/components/Menu.module.css"
import navbar_styles from "@/styles/components/Navbar.module.css"
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import Link from "next/link";
import {CATALOG, CONTACT_US, HOME, ORDERS} from "@/utils/routes";

const Menu = ({ visible, setVisible }) => {

    const [left, setLeft] = useState("-101%")

    useEffect(() => {
        if (visible) {
            setLeft("0")
        } else {
            setLeft("-101%")
        }
    }, [visible])

    const closeMenu = () => {
        setVisible(false)
    }

    return (
        <motion.div
            className={styles.menu}
            initial={{left: "-100%", opacity: 0}}
            animate={{
                left,
                opacity: 1,
            }}
            transition={{
                type: "just",
                layout: { duration: 0.5 },
                bounce: 0,
            }}
        >
            <div className={styles.up_line}>
                <h1 className={navbar_styles.name}>Book Bytes</h1>
                <svg
                    onClick={closeMenu}
                    className={styles.close_svg}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path d="M531.478-253.609 333.609-452.043q-6.566-5.566-9.631-12.913-3.065-7.348-3.065-16.479 0-8.13 3.065-15.761 3.065-7.63 9.631-13.195l198.869-199.435q12.131-11.565 29.174-11.565 17.044 0 30.174 11.565 12.131 12.13 11.631 30.174-.5 18.043-12.631 30.174L422.348-481.435l169.478 169.478q12.131 12.131 12.131 29.174 0 17.044-12.131 29.174-13.13 12.131-30.674 12.131-17.543 0-29.674-12.131Z"/>
                </svg>
            </div>
            <div className={styles.link_wrapper}>
                <Link
                    onClick={closeMenu}
                    href={HOME}
                    className={styles.link}
                >
                    Главная
                </Link>
            </div>
            <div className={styles.link_wrapper}>
                <Link
                    onClick={closeMenu}
                    href={CATALOG}
                    className={styles.link}
                >
                    Книги
                </Link>
            </div>
            <div className={styles.link_wrapper}>
                <Link
                    onClick={closeMenu}
                    href={ORDERS}
                    className={styles.link}
                >
                    Заказы
                </Link>
            </div>
            <div className={styles.link_wrapper}>
                <Link
                    onClick={closeMenu}
                    href={CONTACT_US}
                    className={styles.link}
                >
                    Контакты
                </Link>
            </div>
        </motion.div>
    );
};

export default Menu;
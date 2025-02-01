import styles from "@/styles/components/Navbar.module.css"
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {BASKET, CATALOG, CONTACT_US, HOME, ORDERS} from "@/utils/routes";
import {useRouter} from "next/router";
import Menu from "@/components/Menu";
import {useSelector} from "react-redux";
import {useActions} from "@/hooks/useActions";
import {routerPushCatalogQueryParams} from "@/functions/functions";

function Navbar() {

    const router = useRouter()

    const [isOpenFinder, setIsOpenFinder] = useState(false)
    const [opacity, setOpacity] = useState(1)
    const [finderOpacity, setFinderOpacity] = useState(0)

    const {_basketItems} = useSelector(state => state.basketItems)
    const {setFinderText} = useActions()

    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const [text, setText] = useState('')

    const openFinder = () => {
        setOpacity(0)
        setTimeout(() => {
            setIsOpenFinder(true)
            setFinderOpacity(1)
        }, 300)
    }

    const closeFinder = () => {
        setFinderOpacity(0)
        setTimeout(() => {
            setText('')
            setIsOpenFinder(false)
            setOpacity(1)
        }, 300)
    }

    const findBook = () => {
        if (text) {
            routerPushCatalogQueryParams(router, 1, "", "", JSON.stringify([]), text).then(() =>{
                closeFinder()
                setText("")
            })
        }
    }

    const toBasket = () => {
        router.push(BASKET).then()
    }

    const openMenu = () => {
        setIsOpenMenu(true)
    }

    const updateOpenMenu = (value) => {
        setIsOpenMenu(value)
    }

    return (
        <>
            <Menu visible={isOpenMenu} setVisible={(value) => updateOpenMenu(value)} />
            <div className={styles.navbar}>
                <Container>
                    {isOpenFinder ?
                        <motion.div animate={{opacity: finderOpacity}} className={styles.row}>
                            <svg
                                onClick={findBook}
                                className={styles.finder_svg}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M375.177-316.304q-115.002 0-193.285-78.398-78.283-78.397-78.283-190.848 0-112.45 78.397-190.733 78.398-78.282 190.848-78.282 112.45 0 190.733 78.364t78.283 190.917q0 44.98-13.218 83.784-13.217 38.804-39.522 73.674L827-191.957q12.13 12.252 12.13 30.44 0 18.188-12.13 30.408-12.884 12.196-30.346 12.196t-30.002-12.696L531.049-367.478q-30.701 24.261-70.682 37.717-39.981 13.457-85.19 13.457Zm-1.971-83.175q78.491 0 131.99-53.824 53.499-53.824 53.499-131.899t-53.494-132.132q-53.493-54.057-131.907-54.057-79.247 0-132.879 54.057-53.632 54.057-53.632 132.132t53.549 131.899q53.549 53.824 132.874 53.824Z"/>
                            </svg>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                type="text"
                                className={styles.finder}
                                placeholder="Поиск по книгам"
                            />
                            <svg
                                onClick={closeFinder}
                                className={styles.finder_svg}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M480.435-421.652 278.522-219.739q-13.131 13.13-29.892 13.13-16.76 0-28.891-13.13-13.13-12.131-13.13-28.891 0-16.761 13.13-28.892l202.348-202.913-202.783-202.347q-12.13-12.131-12.13-29.174 0-17.044 12.13-29.174 11.566-12.131 28.609-12.131 17.044 0 30.174 12.131L480-538.652l202.478-203.044q12.131-12.13 28.892-12.13 16.76 0 29.891 12.13 12.13 13.131 12.13 30.109t-12.13 29.109L538.783-480.565l201.913 202.913q12.695 12.695 12.695 29.456t-12.695 28.892q-12.131 12.695-29.174 12.695-17.044 0-28.174-12.695L480.435-421.652Z"/>
                            </svg>
                        </motion.div>
                        :
                        <motion.div animate={{opacity}} className={styles.row}>
                            <svg
                                onClick={openMenu}
                                className={styles.menu_svg + ' ' + styles.svg}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M149.696-221.087q-17.785 0-29.936-11.99t-12.151-29.674q0-17.684 12.151-29.597t29.936-11.913h662.043q16.81 0 28.949 12.202 12.138 12.201 12.138 29.376 0 17.967-12.138 29.782-12.139 11.814-28.949 11.814H149.696Zm0-217.261q-17.785 0-29.936-12.385-12.151-12.386-12.151-29.561 0-17.967 12.151-29.597 12.151-11.631 29.936-11.631h662.043q16.81 0 28.949 11.806 12.138 11.806 12.138 29.49 0 17.684-12.138 29.781-12.139 12.097-28.949 12.097H149.696Zm0-217.391q-17.785 0-29.936-12.386t-12.151-29.561q0-17.966 12.151-29.88 12.151-11.913 29.936-11.913h662.043q16.81 0 28.949 12.089 12.138 12.088 12.138 29.772 0 17.684-12.138 29.782-12.139 12.097-28.949 12.097H149.696Z"/>
                            </svg>
                            <h1 className={styles.name + ' ' + styles.none}>Book Bytes</h1>
                            <div className={styles.link_block + ' ' + styles.none}>
                                <Link href={HOME} className={styles.link}>Главная</Link>
                                <Link href={CATALOG} className={styles.link}>Книги</Link>
                                <Link href={ORDERS} className={styles.link}>Заказы</Link>
                                <Link href={CONTACT_US} className={styles.link}>Контакты</Link>
                            </div>
                            <div className={styles.svg_wrap}>
                                <svg
                                    onClick={openFinder}
                                    className={styles.svg + ' ' + styles.find}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                >
                                    <path d="M375.177-316.304q-115.002 0-193.285-78.398-78.283-78.397-78.283-190.848 0-112.45 78.397-190.733 78.398-78.282 190.848-78.282 112.45 0 190.733 78.364t78.283 190.917q0 44.98-13.218 83.784-13.217 38.804-39.522 73.674L827-191.957q12.13 12.252 12.13 30.44 0 18.188-12.13 30.408-12.884 12.196-30.346 12.196t-30.002-12.696L531.049-367.478q-30.701 24.261-70.682 37.717-39.981 13.457-85.19 13.457Zm-1.971-83.175q78.491 0 131.99-53.824 53.499-53.824 53.499-131.899t-53.494-132.132q-53.493-54.057-131.907-54.057-79.247 0-132.879 54.057-53.632 54.057-53.632 132.132t53.549 131.899q53.549 53.824 132.874 53.824Z"/>
                                </svg>
                                <div className={styles.basket_block + ' ' + styles.svg}>
                                    <svg
                                        onClick={toBasket}
                                        className={styles.svg + ' ' + styles.basket}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                    >
                                        <path d="M198.305-98.696q-20.826 0-37.087-12.195-16.261-12.196-21.957-32.588l-118-422.782q-4-20.391 7.413-35.37 11.413-14.978 31.805-14.978h199.043l180.565-266.869q6.565-9.696 17.108-15.109Q467.739-904 479-904t21.805 5.413q10.543 5.413 16.674 15.109l179.999 266.869h204.043q19.392 0 31.088 14.978 11.695 14.979 7.13 35.37L822.304-143.479q-5.695 20.392-21.739 32.588-16.044 12.195-36.87 12.195h-565.39ZM480-290.305q28.174 0 47.761-19.587 19.587-19.587 19.587-47.76 0-28.174-19.587-47.761Q508.174-425 480-425q-28.174 0-47.761 19.587-19.587 19.587-19.587 47.761 0 28.173 19.587 47.76T480-290.305ZM359.696-616.609h238.608L478.87-790.434 359.696-616.609Z"/>
                                    </svg>
                                    {_basketItems.length !== 0 &&
                                        <p className={styles.count_item + ' fd'}>{_basketItems.length}</p>
                                    }
                                </div>
                            </div>
                        </motion.div>
                    }
                </Container>
            </div>
            <div className={styles.help}></div>
        </>
    )
}

export default Navbar
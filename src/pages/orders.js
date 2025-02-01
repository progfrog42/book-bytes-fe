import HeightWrapper from "@/components/HeightWrapper";
import Grid from "@/components/Grid";
import styles from "@/styles/pages/orders.module.css"
import styles_mk from "@/styles/pages/make-order.module.css"
import global from "@/styles/global.module.css"
import {useState} from "react";
import {motion} from "framer-motion";
import {getOrderByNumber} from "@/api/orderApi";
import {useRouter} from "next/router";
import {ORDER} from "@/utils/routes";
import {add_notification} from "@/functions/functions";
import {useActions} from "@/hooks/useActions";
import Head from "next/head";

function Orders() {

    const router = useRouter()

    const {addNotification} = useActions()

    const [isLoading, setIsLoading] = useState(false)

    const [text, setText] = useState('')
    const [order, setOrder] = useState(null)

    const findOrder = () => {
        if (text) {
            setIsLoading(true)
            getOrderByNumber(text).then(order => {
                setIsLoading(false)
                if (order) {
                    setOrder(order)
                } else {
                    add_notification("Ошибка", "Заказа с таким номером не существует", 1, addNotification)
                }
            })
        }
    }

    const clickOrder = () => {
        router.push(ORDER + order.number).then()
    }

    return (
        <>
            <Head>
                <title>Поиск заказов</title>
                <meta name="description" content="Найдите свои заказы здесь" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Grid>
                <HeightWrapper>
                    <div className={global.margin}/>
                    <div className={styles.up_line}>
                        <h1 className={global.head}>Поиск заказов</h1>
                        <div className={styles_mk.input_wrapper + ' ' + styles.input_len}>
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                type="text"
                                className={styles_mk.input}
                                placeholder="Номер заказа"
                            />
                            {isLoading ?
                                <svg
                                    className={styles.svg + ' ' + styles.loading}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                >
                                    <path d="M480.297-61.174q-88.196 0-164.577-32.042-76.38-32.043-133.421-89.083-57.04-57.041-89.083-133.37-32.042-76.329-32.042-164.8 0-88.307 32.036-164.16 32.036-75.852 88.991-133.053 56.954-57.2 133.198-89.455Q391.643-899.391 480-899.391q16.671 0 29.379 12.765 12.708 12.765 12.708 29.252t-12.708 29.105Q496.671-815.652 480-815.652q-140.125 0-237.888 97.774-97.764 97.774-97.764 237.913t97.774 237.878q97.774 97.739 237.913 97.739t237.878-97.764Q815.652-339.875 815.652-480q0-16.671 12.617-29.379 12.618-12.708 29.105-12.708 16.487 0 29.252 12.708T899.391-480q0 88.357-32.29 164.607-32.291 76.251-89.348 133.235-57.057 56.984-133.204 88.984-76.146 32-164.252 32Z"/>
                                </svg>
                                :
                                <svg
                                    onClick={findOrder}
                                    className={styles.svg}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                >
                                    <path d="M375.177-316.304q-115.002 0-193.285-78.398-78.283-78.397-78.283-190.848 0-112.45 78.397-190.733 78.398-78.282 190.848-78.282 112.45 0 190.733 78.364t78.283 190.917q0 44.98-13.218 83.784-13.217 38.804-39.522 73.674L827-191.957q12.13 12.252 12.13 30.44 0 18.188-12.13 30.408-12.884 12.196-30.346 12.196t-30.002-12.696L531.049-367.478q-30.701 24.261-70.682 37.717-39.981 13.457-85.19 13.457Zm-1.971-83.175q78.491 0 131.99-53.824 53.499-53.824 53.499-131.899t-53.494-132.132q-53.493-54.057-131.907-54.057-79.247 0-132.879 54.057-53.632 54.057-53.632 132.132t53.549 131.899q53.549 53.824 132.874 53.824Z"/>
                                </svg>
                            }
                        </div>
                    </div>
                    <div className={styles.order_list}>
                        {order &&
                            <motion.div
                                className={styles.order + ' fd'}
                                onClick={clickOrder}
                                initial={{y: "1vh"}}
                                animate={{y: 0}}
                            >
                                <div className={styles.line}>
                                    <p className={styles.order_number}>№{order.number}</p>
                                    <p className={styles.date}>{order.createdAt.substring(8, 10)}.{order.createdAt.substring(5, 7)}.{order.createdAt.substring(0, 4)}</p>
                                </div>
                                <div className={styles.email_block}>
                                    <p className={styles.email}>{order.email}</p>
                                </div>
                                <div className={styles.line}>
                                    <p className={styles.price}>{order.price} ₽</p>
                                </div>
                            </motion.div>
                        }
                    </div>
                </HeightWrapper>
            </Grid>
        </>
    );
}

export default Orders;
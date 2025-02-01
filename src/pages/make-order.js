import styles from "@/styles/pages/make-order.module.css"
import global from "@/styles/global.module.css"
import HeightWrapper from "@/components/HeightWrapper";
import Grid from "@/components/Grid";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {wrapper} from "@/store";
import {add_notification, checkBasketToken} from "@/functions/functions";
import {getBooksByIds} from "@/api/bookApi";
import {createPayment} from "@/api/orderApi";
import {useSelector} from "react-redux";
import {useActions} from "@/hooks/useActions";
import Link from "next/link";
import {BASKET, OFFER} from "@/utils/routes";
import Head from "next/head";
import React from "react";

function MakeOrder( {price} ) {

    const router = useRouter()

    const {_basketItems} = useSelector(state => state.basketItems)

    const {addNotification} = useActions()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [checkOffer, setCheckOffer] = useState(false)

    useEffect(() => {
        if (price === 0) {
            router.push(BASKET).then()
        }
    }, [price])

    const back = () => {
        router.back()
    }

    const confirmOffer = () => {
        if (checkOffer) {
            setCheckOffer(false)
        } else {
            setCheckOffer(true)
        }
    }

    const goToPay = () => {
        if (name.length < 2) {
            add_notification("Ошибка", "Длина имени не меньше 2ух символов", 1, addNotification)
            return
        }
        if (!checkOffer) {
            add_notification("Ошибка", "Примите условия оферты", 1, addNotification)
            return
        }
        const sIndex = email.indexOf("@")
        const dIndex = email.indexOf(".")
        if (email.length < 6 || sIndex === 0 || sIndex === -1 ||
            sIndex === email.length - 1 || dIndex === 0 || dIndex === -1 || dIndex === email.length - 1) {
            add_notification("Ошибка", "Неверный формат E-Mail", 1, addNotification)
            return
        }
        const bookIds = []
        _basketItems.forEach(item => {
            bookIds.push(item.bookId)
        })
        createPayment(price, name, email, JSON.stringify(bookIds)).then(payment => {
            router.push(payment.confirmation.confirmation_url).then()
        })
    }

    if (price !== 0) {
        return (
            <>
                <Head>
                    <title>Оформить заказ</title>
                    <meta name="description" content="Оформит заказ" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta charSet="UTF-8" />
                    <meta name="robots" content="noindex, follow" />
                </Head>
                <Grid>
                    <div className={global.pd}>
                        <HeightWrapper>
                            <div className={global.margin} />
                            <div className={styles.up_line}>
                                <p className={global.head}>Оформление заказа</p>
                                <button
                                    onClick={back}
                                    className={styles.button_back}
                                >
                                    <svg
                                        className={styles.back_svg}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 -960 960 960"
                                    >
                                        <path d="M372-108 21-459q-5-5-7-10t-2-11q0-6 2-11t7-10l351-351q11-11 28-11t28 11q12 12 12 28.5T428-795L113-480l315 315q12 12 11.5 28.5T428-109q-12 12-28.5 12T372-108Z"/>
                                    </svg>
                                    Назад
                                </button>
                            </div>
                            <div className={styles.data_block}>
                                <div className={styles.to_pay}>К оплате: <p className={styles.pay_price}>{price.toFixed(2)} ₽</p></div>
                                <div className={styles.input_wrapper}>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={styles.input}
                                        type="text"
                                        placeholder="Ваше имя"
                                    />
                                </div>
                                <div className={styles.input_wrapper}>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.input}
                                        type="email"
                                        placeholder="E-Mail"
                                    />
                                </div>
                                <p className={styles.ps}>Номер заказа будет отправлен на указанный E-Mail</p>
                            </div>
                            <div className={styles.button_line}>
                                <div className={styles.offer_block}>
                                    <div onClick={confirmOffer} className={styles.check + ' ' + (checkOffer ? styles.check_sl : '')}/>
                                    <div className={styles.offer_text}>Я принимаю условия <Link href={OFFER}>оферты</Link></div>
                                </div>
                                <button onClick={goToPay} className={styles.button_pay}>
                                    Оплатить
                                </button>
                            </div>
                        </HeightWrapper>
                    </div>
                </Grid>
            </>
        );
    } else {
        return (
            <HeightWrapper />
        )
    }
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, ...etc}) => {
    const basketItems = await checkBasketToken({req, res}, store.dispatch)

    let bookIds = []
    basketItems.forEach(item => {
        bookIds.push(item.bookId)
    })

    const books = await getBooksByIds(JSON.stringify(bookIds))

    let price = 0
    for (let i = 0; i < basketItems.length; i++) {
        const book = books.find(el => el.id === basketItems[i].bookId)
        price += book.price
    }

    return {
        props: {price}
    }
})


export default MakeOrder;
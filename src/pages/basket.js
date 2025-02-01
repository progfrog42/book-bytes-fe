import styles from "@/styles/pages/basket.module.css"
import HeightWrapper from "@/components/HeightWrapper";
import Grid from "@/components/Grid";
import global from "@/styles/global.module.css";
import {motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {CATALOG, MAKE_ORDER} from "@/utils/routes";
import BasketBook from "@/components/BasketBook";
import {wrapper} from "@/store";
import {checkBasketToken} from "@/functions/functions";
import {getBooksByIds} from "@/api/bookApi";
import Link from "next/link";
import {getAllGenreByBookId} from "@/api/genreApi";
import Head from "next/head";

function Basket({ basketBooks }) {

    const router = useRouter()

    const [basketItems, setArrayItems] = useState(basketBooks)
    const [totalPrice, setTotalPrice] = useState(0)

    const [height, setHeight] = useState(0)

    const layoutRef = useRef(null)
    const lineRef = useRef(null)
    const itemRef = useRef(null)

    useEffect(() => {
        if (layoutRef && lineRef && itemRef.current && basketItems.length !== 0) {
            const availableHeight = layoutRef.current.getBoundingClientRect().height - lineRef.current.getBoundingClientRect().height
            const itemHeight = itemRef.current.getBoundingClientRect().height
            let count = Math.trunc(availableHeight / itemHeight)
            if (count < 1) count = 1
            setHeight(count * itemHeight)
        }
        let fullPrice = 0
        basketItems.forEach(item => fullPrice += item.price)
        setTotalPrice(fullPrice)
    }, [layoutRef, lineRef, itemRef, basketItems])

    const toMakeOrder = () => {
        router.push(MAKE_ORDER).then()
    }

    const updateBasketItems = (value) => {
        setArrayItems(value)
    }

    return (
        <>
            <Head>
                <title>Корзина</title>
                <meta name="description" content="Ваша корзина" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, nofollow" />
            </Head>
            <div ref={layoutRef}>
                <Grid>
                    <HeightWrapper>
                        {basketItems.length !== 0 ?
                            <>
                                <div ref={lineRef}>
                                    <div className={global.margin}/>
                                    <div className={styles.up_line}>
                                        <p className={global.head + ' ' + styles.basket_text}>Ваша корзина</p>
                                        <p className={styles.total_price}>В сумме: {totalPrice.toFixed(2)} ₽</p>
                                        <button
                                            onClick={toMakeOrder}
                                            className={styles.create_order}
                                        >
                                            Оформить заказ
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.wrapper_items}>
                                    <div
                                        className={styles.items}
                                        style={{maxHeight: height, transition: "all 0s"}}
                                    >
                                        {basketItems.map(item =>
                                            <BasketBook
                                                key={item.basketItemId}
                                                router={router}
                                                items={basketItems}
                                                item={item}
                                                itemRef={itemRef}
                                                setArrayItems={(value) => updateBasketItems(value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                            :
                            <div className={styles.empty_basket_block + " fd"}>
                                <div className={styles.empty_basket_text}>
                                    Корзина пуста <br/> <Link href={CATALOG} className={styles.href}>Добавьте книги в корзину</Link>
                                </div>
                            </div>
                        }
                    </HeightWrapper>
                </Grid>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, ...etc}) => {

    const basketItems = await checkBasketToken({req, res}, store.dispatch)

    let bookIds = []
    basketItems.forEach(item => {
        bookIds.push(item.bookId)
    })

    const books = await getBooksByIds(JSON.stringify(bookIds))

    let basketBooks = []
    for (let i = 0; i < basketItems.length; i++) {
        const book = books.find(el => el.id === basketItems[i].bookId)
        const genres = await getAllGenreByBookId(book.id)
        basketBooks.push({...book, basketItemId: basketItems[i].id, basketToken: basketItems[i].basketToken, genres})
    }

    return {
        props: {basketBooks}
    }
})

export default Basket;
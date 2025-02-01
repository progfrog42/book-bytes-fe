import styles from "@/styles/pages/order.module.css"
import global from "@/styles/global.module.css"
import HeightWrapper from "@/components/HeightWrapper";
import Grid from "@/components/Grid";
import {getOrderByNumber} from "@/api/orderApi";
import OrderBook from "@/components/OrderBook";
import {useEffect, useRef, useState} from "react";
import {getBooksByOrderId} from "@/api/bookApi";
import {getAllGenreByBookId} from "@/api/genreApi";
import Head from "next/head";

function Order({ order, books }) {

    const listRef = useRef(null)
    const itemRef = useRef(null)

    const [height, setHeight] = useState('0')

    useEffect(() => {
        if (itemRef && listRef) {
            const availableHeight = listRef.current.getBoundingClientRect().height
            const itemHeight = itemRef.current.getBoundingClientRect().height
            let count = Math.trunc(availableHeight / itemHeight)
            if (count < 1) count = 1
            setHeight(count * itemHeight)
        }
    }, [itemRef, listRef])

    return (
        <>
            <Head>
                <title>Заказ №{order.number}</title>
                <meta name="description" content="Заказ" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Grid>
                <div className={global.pd}>
                    <HeightWrapper>
                        <div className={global.margin}/>
                        <div className={styles.up_line}>
                            <h1 className={global.head}>Заказ №{order.number}</h1>
                            <p className={styles.price}>{order.price} ₽</p>
                        </div>
                        <div className={styles.text}>
                            Файлы <p className={styles.bold}>.pdf</p> удобно
                            читать на компьютере, файлы <p className={styles.bold}>.epub</p> предназначены
                            для <p className={styles.bold}>электронных книг</p>,
                            также их можно добавить в <p className={styles.bold}>iBooks</p>.
                        </div>
                        <div ref={listRef} className={styles.block_list}>
                            <div
                                style={{maxHeight: height, transition: "all 0s"}}
                                className={styles.book_list}
                            >
                                {books.map(book =>
                                    <OrderBook
                                        key={book.id}
                                        itemRef={itemRef}
                                        book={book}
                                    />
                                )}
                            </div>
                        </div>
                    </HeightWrapper>
                </div>
            </Grid>
        </>
    );
}

export async function getServerSideProps({ params, req, res }) {
    const number = params.number

    const order = await getOrderByNumber(number)

    const books_list = await getBooksByOrderId(order.id)

    const books = []
    for (let i = 0; i < books_list.length; i++) {
        const book = books_list[i]
        const genres = await getAllGenreByBookId(book.id)
        books.push({...book, genres})
    }

    return {
        props: { order, books }
    }
}

export default Order;
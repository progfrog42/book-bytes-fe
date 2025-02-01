import styles from "@/styles/pages/book.module.css"
import global from "@/styles/global.module.css"
import HeightWrapper from "@/components/HeightWrapper";
import Grid from "@/components/Grid";
import {Col} from "react-bootstrap";
import Image from "next/image";
import {getBookByToken} from "@/api/bookApi";
import {HOST} from "@/utils/routes";
import {getCookie} from "cookies-next";
import {createBasketItem} from "@/api/basketApi";
import {add_notification, checkBasketToken} from "@/functions/functions";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";
import {getAllGenreByBookId} from "@/api/genreApi";
import {wrapper} from "@/store";
import Head from "next/head";

function Book({ book, genres }) {

    const src = process.env.NEXT_PUBLIC_HOST + 'image/' + book.image

    const {addBasketItem, addNotification} = useActions()
    const {_basketItems} = useSelector(state => state.basketItems)

    const addToCart = () => {
        const token = getCookie('token')
        if (token) {
            if (_basketItems.findIndex(el => el.basketToken === token && el.bookId === book.id) === -1) {
                createBasketItem(token, book.id).then(basketItem => {
                    addBasketItem(basketItem)
                    add_notification("Книга добавлена", "Книга добавлена в корзину", 0, addNotification)
                })
            } else {
                add_notification("Книга уже в корзине", "Эта книга уже добавлена в корзину", 0, addNotification)
            }
        }
    }

    return (
        <>
            <Head>
                <title>{book.name}</title>
                <meta name="description" content="Увлекательная цифровая книга в формате PDF или EPUB. История, которая захватит вас с первых страниц." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
            </Head>
            <HeightWrapper>
                <Grid>
                    <div className={global.margin + ' ' + styles.h0} />
                    <Col
                        className={styles.book_image_block}
                        xxl={5} xl={5} lg={5} md={5} sm={5} xs={12}
                    >
                        <img
                            src={src}
                            className={styles.book_image}
                            alt="Book image"
                        />
                    </Col>
                    <Col xxl={7} xl={7} lg={7} md={7} sm={7} xs={12}>
                        <div className={styles.right_block}>
                            <h1 className={styles.name}>{book.name}</h1>
                            <p className={styles.small_description}>
                                {book.description}
                            </p>
                            <div className={styles.genres}>
                                {genres.map(genre =>
                                    <p
                                        key={genre.id}
                                        className={styles.genre}
                                    >
                                        {genre.name}
                                    </p>
                                )}
                            </div>
                            <div className={styles.price_line}>
                                <button
                                    onClick={addToCart}
                                    className={styles.add_to_card}
                                >
                                    В корзину
                                </button>
                                <p className={styles.price}>{book.price.toFixed(2)} ₽</p>
                            </div>
                        </div>
                    </Col>
                    <Col
                        className={styles.large_description}
                        xxl={{span: 8, offset: 2}}
                    >
                        {book.beginning_book}
                    </Col>
                </Grid>
            </HeightWrapper>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({params, req, res, ...etc}) => {

    await checkBasketToken({req, res}, store.dispatch)

    const token = params.token

    const book = await getBookByToken(token)

    const genres = await getAllGenreByBookId(book.id)

    return {
        props: {book, genres}
    }
})

export default Book;
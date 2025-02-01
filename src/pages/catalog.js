import styles from "@/styles/pages/catalog.module.css"
import Grid from "@/components/Grid";
import HeightWrapper from "@/components/HeightWrapper";
import {motion} from "framer-motion";
import Book from "@/components/Book";
import Pagination from "@/components/Pagination";
import {useEffect, useState} from "react";
import Filters from "@/components/Filters";
import {getBooksByFilter, getLastBook, getPrices} from "@/api/bookApi";
import {getAllGenres} from "@/api/genreApi";
import {wrapper} from "@/store";
import {add_notification, checkBasketToken, routerPushCatalogQueryParams} from "@/functions/functions";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import {createBasketItem} from "@/api/basketApi";
import {SET_FIND_BOOK} from "@/store/reducers/finderReducer/finderReducerActions";
import {useRouter} from "next/router";
import Head from "next/head";

function Catalog({ maxQ, minQ, max, min, genreIds, queryPage, pageCount, books, genres, last_book, findText }) {

    const router = useRouter()

    const [filtersVisible, setFiltersVisible] = useState(false)

    const [findHeight, setFindHeight] = useState("0")
    const [findOpacity, setFindOpacity] = useState(0)
    const [findDisplay, setFindDisplay] = useState("none")

    const [finderGenres, setFinderGenres] = useState('')
    const [filteredGenres, setFilteredGenres] = useState(genres)

    const [page, setPage] = useState({page: queryPage, count: pageCount})

    const [find, setFinderText] = useState('')

    const {addBasketItem, addNotification} = useActions()
    const {_basketItems} = useSelector(state => state.basketItems)

    const [booksArray, setBooksArray] = useState([])

    const [filters, setFilters] = useState({
        max: maxQ, min: minQ, genreIds: genreIds
    })

    useEffect(() => {
        setFinderText(findText)
    }, [])

    useEffect(() => {
        setFinderText(findText)
        setBooksArray(books)
    }, [books])

    useEffect(() => {
        routerPushCatalogQueryParams(router, 1, filters.max, filters.min, JSON.stringify(filters.genreIds), find).then(() => {
            setPage({page: queryPage, count: pageCount})
        })
    }, [filters, find])

    useEffect(() => {
        if (find) {
            setFindDisplay("flex")
            setFindHeight("3.6rem")
            setTimeout(() => {
                setFindOpacity(1)
            }, 1000)
        }
    }, [find])

    useEffect(() => {
        if (finderGenres) {
            setFilteredGenres(Object.values(genres).filter(genre => {
                return genre.name.toLowerCase().includes(finderGenres.toLowerCase())
            }))
        } else {
            setFilteredGenres(genres)
        }
    }, [finderGenres])

    const updatePage = (value) => {
        setPage({...page, page: value})
    }

    const cleanFinder = () => {
        setFindOpacity(0)
        setTimeout(() => {
            setFindHeight("0")
            setTimeout(() => {
                setFindDisplay("none")
                setFinderText("")
            }, 500)
        }, 500)
    }

    const updateFilters = (value) => {
        setFilters(value)
    }

    const updateFiltersVisible = (value) => {
        setFiltersVisible(value)
    }

    const addGenre = (id) => {
        setFilters({...filters, genreIds: [id]})
    }

    const addToCart = () => {
        const token = getCookie('token')
        if (token) {
            if (_basketItems.findIndex(el => el.basketToken === token && el.bookId === last_book.id) === -1) {
                createBasketItem(token, last_book.id).then(basketItem => {
                    addBasketItem(basketItem)
                    add_notification("Книга добавлена", "Книга добавлена в корзину", 0, addNotification)
                })
            } else {
                add_notification("Книга уже в корзине", "Эта книга уже добавлена в корзину", 0, addNotification)
            }
        }
    }

    const src_last_book = process.env.NEXT_PUBLIC_HOST + 'image/' + last_book.image

    return (
        <>
            <Head>
                <title>Каталог</title>
                <meta name="description" content="Погрузитесь в удивительный мир цифровых книг. Каталог с лучшими произведениями для всех вкусов и интересов." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Grid>
                <Filters
                    save={filters}
                    genres={genres}
                    setSaveFilters={(value) => updateFilters(value)}
                    visible={filtersVisible}
                    setVisible={(value) => updateFiltersVisible(value)}
                    maxDt={max}
                    minDt={min}
                />
                <HeightWrapper>
                    <div className={styles.large_blocks}>
                        <div className={styles.large_block}>
                            <div className={styles.large_book_img_block}>
                                <img
                                    className={styles.large_book_img}
                                    src={src_last_book}
                                    alt="book"
                                />
                            </div>
                            <div className={styles.description_block}>
                                <h1 className={styles.name_block}>{last_book.name}</h1>
                                <p className={styles.description_book}>
                                    {last_book.description}
                                </p>
                                <button
                                    onClick={addToCart}
                                    className={styles.add_to_card}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>
                        <div className={styles.large_block + ' ' + styles.ml_auto + ' ' + styles.padding_genres}>
                            <div className={styles.line_genres}>
                                <h1
                                    style={{marginBottom: 0}}
                                    className={styles.name_block}
                                >
                                    Жанры
                                </h1>
                                <div className={styles.finder_genres_block}>
                                    <div className={styles.finder_wrapper}>
                                        <input
                                            value={finderGenres}
                                            onChange={(e) => setFinderGenres(e.target.value)}
                                            type="text"
                                            className={styles.finder_genres}
                                            placeholder="Поиск по жанрам..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.genres_list}>
                                {filteredGenres.map(genre =>
                                    <p
                                        key={genre.id}
                                        onClick={() => addGenre(genre.id)}
                                        className={styles.genre}
                                    >
                                        {genre.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.filter_block}>
                        <motion.div
                            className={styles.finder_text}
                            initial={{height: 0, opacity: 0, display: "none"}}
                            animate={{height: findHeight, opacity: findOpacity, display: findDisplay}}
                        >
                            {find}
                            <svg
                                onClick={cleanFinder}
                                className={styles.finder_svg}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M480.435-421.652 278.522-219.739q-13.131 13.13-29.892 13.13-16.76 0-28.891-13.13-13.13-12.131-13.13-28.891 0-16.761 13.13-28.892l202.348-202.913-202.783-202.347q-12.13-12.131-12.13-29.174 0-17.044 12.13-29.174 11.566-12.131 28.609-12.131 17.044 0 30.174 12.131L480-538.652l202.478-203.044q12.131-12.13 28.892-12.13 16.76 0 29.891 12.13 12.13 13.131 12.13 30.109t-12.13 29.109L538.783-480.565l201.913 202.913q12.695 12.695 12.695 29.456t-12.695 28.892q-12.131 12.695-29.174 12.695-17.044 0-28.174-12.695L480.435-421.652Z"/>
                            </svg>
                        </motion.div>
                        <button
                            onClick={() => setFiltersVisible(true)}
                            className={styles.filter_button}
                        >
                            Настроки
                            {filters.max !== maxQ || filters.min !== minQ || filters.genreIds.length !== 0 ?
                                <svg
                                    className={styles.filter_svg}
                                    style={{fill: '#CB2903'}}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.57,8.59,10,13,10,13v5c0,1.1,0.9,2,2,2h0c1.1,0,2-0.9,2-2v-5c0,0,3.43-4.41,5.75-7.39 C20.26,4.95,19.79,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g>
                                </svg>
                                :
                                <svg
                                    className={styles.filter_svg}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.57,8.59,10,13,10,13v5c0,1.1,0.9,2,2,2h0c1.1,0,2-0.9,2-2v-5c0,0,3.43-4.41,5.75-7.39 C20.26,4.95,19.79,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g>
                                </svg>
                            }
                        </button>
                    </div>
                    <div className={styles.books}>
                        {books.length !== 0 ?
                            <>
                                {booksArray.map(book =>
                                    <Book
                                        key={book.id}
                                        book={book}
                                    />
                                )}
                            </>
                            :
                            <motion.div
                                className={styles.empty_block}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <p className={styles.empty_text}>Книг не найдено, пожалуйста измените настройки</p>
                            </motion.div>
                        }
                    </div>
                    {booksArray.length !== 0 &&
                        <Pagination pageState={{page: queryPage, count: pageCount}} setPage={(value) => updatePage(value)} />
                    }
                </HeightWrapper>
            </Grid>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({query, req, res, ...etc}) => {

    await checkBasketToken({req, res}, store.dispatch)

    const page = query.page ? Number(query.page) : 1
    let maxQ = query.max
    let minQ = query.min
    let genreIds = query.gIds
    let findText = query.finder ? query.finder : ""

    const {max, min} = await getPrices()

    if (!maxQ)
        maxQ = max
    else
        maxQ = Number(maxQ)
    if (!minQ)
        minQ = min
    else
        minQ = Number(minQ)

    if (!genreIds)
        genreIds = []
    else
        genreIds = JSON.parse(query.gIds)

    const books_row = await getBooksByFilter(page, maxQ, minQ, JSON.stringify(genreIds), findText)
    const books = books_row.rows

    //store.dispatch({type: SET_FIND_BOOK, payload: finder})

    const genres = await getAllGenres()

    const last_book = await getLastBook()

    const queryPage = page
    const pageCount = books_row.pageCount

    return {
        props: {maxQ, minQ, max, min, queryPage, pageCount, genreIds, books, genres, last_book, findText}
    }
})

export default Catalog;
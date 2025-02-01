import styles from "@/styles/pages/home.module.css"
import global from "@/styles/global.module.css"
import Grid from "@/components/Grid";
import HeightWrapper from "@/components/HeightWrapper";
import {Col} from "react-bootstrap";
import {getLastBook} from "@/api/bookApi";
import {BOOK, CATALOG} from "@/utils/routes";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from 'next/head'

function Home({ last_book }) {

    const router = useRouter()

    const src = process.env.NEXT_PUBLIC_HOST + 'image/' + last_book.image

    const clickViewBook = () => {
        router.push(BOOK + last_book.token).then()
    }

    return (
        <>
            <Head>
                <title>Book Bytes - книги в цифровом формате</title>
                <meta name="description" content="Откройте волшебство цифровых страниц с нашими книгами." />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
            </Head>
            <HeightWrapper>
                <div className={global.margin} />
                <Grid>
                    <div className={styles.wel_block}>
                        <h1 className={styles.welcome_head}>Добро пожаловать в наш онлайн магазин!</h1>
                        <p className={styles.welcome_text}>
                            В этом магазине вы найдете огромную коллекцию цифровых книг! Исследуйте безграничный мир литературы, не выходя из собственного дома, с мгновенным доступом к обширной библиотеке электронных книг, охватывающих различные жанры.
                        </p>
                    </div>
                </Grid>
                <Grid className={styles.grid}>
                    <div className={styles.line_new_text}>
                        <div className={styles.new_text_wrapper}>
                            <p className={styles.text_new}>Новинка</p>
                        </div>
                    </div>
                    <div className={styles.book}>
                        <Col className={styles.image_wrapper} xxl={3} xl={3} lg={3} md={3} sm={4} xs={4}>
                            <img
                                className={styles.image}
                                src={src}
                                alt="book image"
                            />
                        </Col>
                        <div className={styles.description_block}>
                            <h1 className={styles.name}>{last_book.name}</h1>
                            <p className={styles.description_text}>
                                {last_book.description}
                            </p>
                            <button
                                onClick={clickViewBook}
                                className={styles.view_book}
                            >
                                Посмотреть
                            </button>
                        </div>
                    </div>
                    <div className={styles.under_text}>
                        Весь список книг вы можете посмотреть в <Link href={CATALOG} className={styles.link}>каталоге</Link>.
                    </div>
                </Grid>
            </HeightWrapper>
        </>
    );
}

export async function getServerSideProps({ req, res }) {

    const last_book = await getLastBook()

    return {
        props: {last_book}
    }
}


export default Home;
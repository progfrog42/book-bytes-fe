import styles from "@/styles/pages/contact-us.module.css"
import global from "@/styles/global.module.css"
import Grid from "@/components/Grid";
import HeightWrapper from "@/components/HeightWrapper";
import Link from "next/link";
import {OFFER} from "@/utils/routes";
import {useEffect, useState} from "react";
import Head from "next/head";

function ContactUs() {

    const [mail, setMail] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setMail('bookbytes@yandex.ru')
        }, 100)
    }, [])

    return (
        <>
            <Head>
                <title>Контакты</title>
                <meta name="description" content="Контакты для связи с нами" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Grid>
                <div className={global.pd}>
                    <HeightWrapper>
                        <div className={global.margin}/>
                        <h1 className={global.head}>Контакты</h1>
                        <p className={styles.text}>
                            Если у вас возникли проблемы с работой сайта, то вы можете написать на нашу почту, мы ответим в кратчайшие сроки.
                        </p>
                        <p className={styles.hp_text}>Мы рады помочь вам!</p>
                        <div className={styles.wrap}>
                            <div className={styles.det_wrap}>
                                <div className={styles.email_wrapper}>
                                    <a href="mailto:bookbytes@yandex.ru?subject=Support" className={styles.email}>{mail}</a>
                                </div>
                                <p className={styles.det_text}>Подробно опишите проблему</p>
                            </div>
                        </div>
                        <div className={styles.offer_block}>
                            <Link href={OFFER} className={styles.offer}>Публичная оферта</Link>
                        </div>
                    </HeightWrapper>
                </div>
            </Grid>
        </>
    );
}

export default ContactUs;
import styles from "@/styles/components/Footer.module.css"
import Link from "next/link";
import {CONTACT_US, OFFER} from "@/utils/routes";

const Footer = () => {
    return (
        <div className={styles.block}>
            <div className={styles.link_block}>
                <Link href={CONTACT_US} className={styles.link + ' ' + styles.href}>Контакты</Link>
            </div>
            <div className={styles.link_block}>
                <p className={styles.link}>Book Bytes 2023</p>
            </div>
            <div className={styles.link_block}>
                <Link href={OFFER} className={styles.link + ' ' + styles.href}>Публичная оферта</Link>
            </div>
        </div>
    );
};

export default Footer;
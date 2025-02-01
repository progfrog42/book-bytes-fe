import styles from "@/styles/components/Thanks.module.css"
import {motion} from "framer-motion";
import {CONTACT_US, ORDER} from "@/utils/routes";
import Link from "next/link";

const Thanks = ({ order }) => {

    return (
        <motion.div
            div className={styles.block}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <p className={styles.thanks_text}>
                Спасибо за покупку!
            </p>
            <div className={styles.email_text}>
                <Link href={ORDER + order.number}>№ {order.number}</Link><br />
                Номер заказа был отправлен на указанный E-Mail:
                <p className={styles.email}>{order.email}</p>
            </div>
            <Link
                href={CONTACT_US}
                className={styles.contact}
            >
                Контакты
            </Link>
        </motion.div>
    );
};

export default Thanks;
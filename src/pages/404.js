import styles from "@/styles/pages/404.module.css"
import HeightWrapper from "@/components/HeightWrapper";

function Error404() {
    return (
        <HeightWrapper>
            <div className={styles.wrap}>
                <div className={styles.block}>
                    <p className={styles.text}>404</p>
                    <div className={styles.sep} />
                    <p className={styles.text}>Page not found</p>
                </div>
            </div>
        </HeightWrapper>
    );
}

export default Error404;
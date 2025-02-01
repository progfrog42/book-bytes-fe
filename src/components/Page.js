import styles from "@/styles/components/Page.module.css"
import {useRouter} from "next/router";
import {CATALOG} from "@/utils/routes";

const Page = ({ currentPage, page }) => {

    const router = useRouter()

    const setCurrentPage = () => {
        router.push({
            pathname: CATALOG,
            query: {...router.query, page: page}
        }).then()
    }

    return (
        <>
            {page === currentPage ?
                <p
                    key={page + '1'}
                    style={{color: "white", backgroundColor: "black"}}
                    className={styles.block}
                >
                    {page}
                </p>
                :
                <p
                    key={page + '2'}
                    onClick={setCurrentPage}
                    className={styles.block}
                >
                    {page}
                </p>
            }
        </>
    );
};

export default Page;
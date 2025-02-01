import styles from "@/styles/components/Pagination.module.css"
import Page from "@/components/Page";
import {motion} from "framer-motion";
import {CATALOG} from "@/utils/routes";
import {useRouter} from "next/router";

const Pagination = ({ pageState, setPage }) => {

    const router = useRouter()

    let pages = []

    for (let i = 1; i <= pageState.count; i++) {
        pages.push(i)
    }

    const setCurrentPage = (page, not) => {
        if (page !== not) {
            router.push({
                pathname: CATALOG,
                query: {...router.query, page: page}
            }).then()
        }
    }

    return (
        <div className={styles.block + ' fd'}>
            <svg
                onClick={() => setCurrentPage(pageState.page - 1, 0)}
                className={styles.arrow_svg + ' ' + (pageState.page === 1 && styles.arrow_svg_no_click)}
                viewBox="0 -960 960 960"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M539-262 341-460q-5-5-7-10t-2-11q0-6 2-11t7-10l199-199q9-9 21.5-9t21.5 9q9 9 8.5 22t-9.5 22L406-481l177 177q9 9 9 21t-9 21q-9 9-22 9t-22-9Z"/>
            </svg>
            <PagesList currentPage={pageState.page} pages={pages} setPage={setPage} />
            <svg
                onClick={() => setCurrentPage(pageState.page + 1, pageState.count + 1)}
                className={styles.arrow_svg + ' ' + (pageState.page === pageState.count && styles.arrow_svg_no_click)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
            >
                <path d="M354-262q-8-10-8.5-22t8.5-21l176-176-177-177q-8-8-7.5-21.5T354-701q10-10 21.5-9.5T396-701l199 199q5 5 7 10t2 11q0 6-2 11t-7 10L397-262q-9 9-21 8.5t-22-8.5Z"/>
            </svg>
        </div>
    );
};

const PagesList = ({ pages, currentPage, setPage }) => {

    if (pages.length <= 3) {
        return (
            <>
                {pages.map(number =>
                    <Page key={number} currentPage={currentPage} setPage={setPage} page={number} />
                )}
            </>
        )
    } else if (currentPage === 1) {
        return (
            <>
                <Page currentPage={currentPage} setPage={setPage} page={1} />
                <Page currentPage={currentPage} setPage={setPage} page={2} />
                <Page currentPage={currentPage} setPage={setPage} page={3} />
            </>
        )
    } else if (currentPage === pages.length) {
        return (
            <>
                <Page currentPage={currentPage} setPage={setPage} page={currentPage-2} />
                <Page currentPage={currentPage} setPage={setPage} page={currentPage-1} />
                <Page currentPage={currentPage} setPage={setPage} page={currentPage} />
            </>
        )
    } else {
        return (
            <>
                <Page currentPage={currentPage} setPage={setPage} page={currentPage-1} />
                <Page currentPage={currentPage} setPage={setPage} page={currentPage} />
                <Page currentPage={currentPage} setPage={setPage} page={currentPage+1} />
            </>
        )
    }

}

export default Pagination;
import styles from "@/styles/components/OrderBook.module.css"
import {downloadBook} from "@/api/bookApi";

const OrderBook = ({ itemRef, book }) => {

    const src = process.env.NEXT_PUBLIC_HOST + 'image/' + book.image

    const downloadPdf = () => {
        downloadBook(book.file, ".pdf").then(data => {
            const url = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = book.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    const downloadEpub = () => {
        downloadBook(book.file, ".epub").then(data => {
            const url = URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = book.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        })
    }

    return (
        <div key={book.id + '1'} ref={itemRef}>
            <div className={styles.block}>
                <img
                    key={book.id + '2'}
                    className={styles.image}
                    src={src}
                    alt="book image"
                />
                <div key={book.id + '3'} className={styles.description_block}>
                    <p key={book.id + '4'} className={styles.name}>{book.name}</p>
                    <p key={book.id + '5'} className={styles.description}>
                        {book.description}
                    </p>
                    <div>
                        {book.genres.map(genre =>
                            <p
                                key={genre.id}
                                className={styles.genre}
                            >
                                {genre.name}
                            </p>
                        )}
                    </div>
                    <div key={book.id + '7'} className={styles.downloads}>
                        <p
                            key={book.id + '8'}
                            onClick={downloadPdf}
                            className={styles.download + ' ' + styles.pdf}
                        >
                            .pdf
                        </p>
                        <p
                            key={book.id + '9'}
                            onClick={downloadEpub}
                            className={styles.download + ' ' + styles.epub}
                        >
                            .epub
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
import {Col} from "react-bootstrap";
import styles from "@/styles/components/Book.module.css"
import {useRouter} from "next/router";
import {BOOK} from "@/utils/routes";
import {getCookie} from "cookies-next";
import {createBasketItem} from "@/api/basketApi";
import {useActions} from "@/hooks/useActions";
import {add_notification} from "@/functions/functions";
import {useSelector} from "react-redux";

const Book = ({ book }) => {

    const router = useRouter()

    const {addBasketItem, addNotification} = useActions()
    const {_basketItems} = useSelector(state => state.basketItems)

    const src = process.env.NEXT_PUBLIC_HOST + 'image/' + book.image

    const clickOnBook = () => {
        router.push(BOOK + book.token).then(() => {
            console.log('push')
        })
    }

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
        <Col
            key={book.id + '1'}
            xxl={3} xl={3} lg={3} md={3} sm={4} xs={6}
            className={styles.block}
        >
            <div key={book.id + '2'} className="fd">
                <img
                    key={book.id + '3'}
                    onClick={clickOnBook}
                    src={src}
                    className={styles.image}
                    alt="book preview"
                />
                <h1 key={book.id + '4'} className={styles.name}>{book.name}</h1>
                <p key={book.id + '5'} className={styles.price}>{book.price.toFixed(2)} ₽</p>
                <button
                    key={book.id + '6'}
                    onClick={addToCart}
                    className={styles.add_to_card}
                >
                    В корзину
                </button>
            </div>
        </Col>
    );
};

export default Book;
import styles from "@/styles/components/BasketBook.module.css";
import {motion, useMotionValue} from "framer-motion";
import {useEffect, useState} from "react";
import {BOOK, HOST} from "@/utils/routes";
import {removeBasketItem} from "@/api/basketApi";
import {useActions} from "@/hooks/useActions";
import {useSelector} from "react-redux";

const BasketBook = ({ itemRef, item, items, router, setArrayItems }) => {

    const {setBasketItems} = useActions()
    const {_basketItems} = useSelector(state => state.basketItems)

    const [opacity, setOpacity] = useState(1)
    const height = useMotionValue(0)
    const [display, setDisplay] = useState(true)

    const src = process.env.NEXT_PUBLIC_HOST + 'image/' + item.image

    const deleteCurrentItem = () => {
        setOpacity(0)
        setTimeout(() => {
            setDisplay(false)
            height.set(1)
            setTimeout(() => {
                removeBasketItem(item.basketItemId).then(() => {
                    setBasketItems(_basketItems.filter(el => el.id !== item.basketItemId))
                    setArrayItems(items.filter(el => el.basketItemId !== item.basketItemId))
                })
            }, 400)
        }, 400)
    }

    const clickOnItem = () => {
        router.push(BOOK + item.token).then()
    }

    useEffect(() => {
        if (itemRef) {
            height.set(itemRef.current.getBoundingClientRect().height)
        }
    }, [itemRef])

    return (
        <motion.div
            key={item.basketItemId + '1'}
            animate={{
                opacity,
            }}
            style={{
                height: height.current === 0 ? "auto" : height,
            }}
            ref={itemRef}
            className={styles.basket_item}
        >
            <img
                key={item.basketItemId + '2'}
                onClick={clickOnItem}
                style={{display: display ? "block" : "none"}}
                alt="book image"
                src={src}
                className={styles.book_image + ' ' + styles.padding_item}
            />
            <div
                key={item.basketItemId + '3'}
                style={{display: display ? "flex" : "none"}}
                className={styles.info_block + ' ' + styles.padding_item}
            >
                <div key={item.basketItemId + '4'} className={styles.name_line}>
                    <h1 key={item.basketItemId + '5'} className={styles.name}>{item.name}</h1>
                    <div className={styles.delete}>
                        <svg
                            key={item.basketItemId + '6'}
                            onClick={deleteCurrentItem}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                            className={styles.delete_svg}
                        >
                            <path d="M480-438 270-228q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522-480l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480-438Z"/>
                        </svg>
                    </div>
                </div>
                <p
                    key={item.basketItemId + '7'}
                    className={styles.description}
                >
                    {item.description}
                </p>
                <div>
                    {item.genres.map(genre =>
                        <div
                            key={genre.id + '0'}
                            className={styles.genres}
                        >
                            <p className={styles.genre}>{genre.name}</p>
                        </div>
                    )}
                </div>
                <p
                    key={item.basketItemId + '8'}
                    className={styles.price}
                >
                    {item.price.toFixed(2)} ₽
                </p>
            </div>
        </motion.div>
    );
};

export default BasketBook;
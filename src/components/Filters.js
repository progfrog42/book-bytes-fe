import {CSSTransition} from "react-transition-group";
import styles from "@/styles/components/Filters.module.css"
import {useEffect, useRef, useState} from "react";
import Slider from "@/components/Slider";

const Filters = ({visible, setVisible, save, setSaveFilters, genres, maxDt, minDt}) => {

    const profileRef = useRef(null)

    const [minPrice, setMinPrice] = useState(save.min)
    const [maxPrice, setMaxPrice] = useState(save.max)

    const [currentGenres, setCurrentGenres] = useState(save.genreIds)

    useEffect(() => {
        setCurrentGenres(save.genreIds)
    }, [save])

    useEffect(() => {
        if (minPrice > maxPrice) {
            const tmp = maxPrice
            setMaxPrice(minPrice)
            setMinPrice(tmp)
        }
    }, [minPrice, maxPrice])

    const updateMinPrice = (value) => {
        setMinPrice(value)
    }

    const updateMaxPrice = (value) => {
        setMaxPrice(value)
    }

    const closePopup = () => {
        setVisible(false)
        setTimeout(() => {
            setSaveFilters({
                max: maxPrice,
                min: minPrice,
                genreIds: currentGenres
            })
        }, 700)
    }

    const resetFilters = () => {
        setMaxPrice(maxDt)
        setMinPrice(minDt)
        setCurrentGenres([])
    }

    const addGenre = (id) => {
        if (!currentGenres.includes(id)) {
            setCurrentGenres([...currentGenres, id])
        }
    }

    const deleteGenre = (id) => {
        setCurrentGenres(currentGenres.filter(el => el !== id))
    }

    return (
        <CSSTransition
            in={visible}
            timeout={580}
            classNames="popup-back"
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.background + ' popup-back'}>
                <div ref={profileRef} className={styles.window}>
                    <div className={styles.filters_area}>
                        <div className={styles.price_line}>
                            <p className={styles.head_text}>Цена</p>
                            <div className={styles.range_slider_block}>
                                <p className={styles.price}>{minPrice.toFixed(0)} ₽</p>
                                <Slider
                                    min={minDt}
                                    max={maxDt}
                                    step={1}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    setMaxPrice={(value) => updateMaxPrice(value)}
                                    setMinPrice={(value) => updateMinPrice(value)}
                                />
                                <p className={styles.price}>{maxPrice.toFixed(0)} ₽</p>
                            </div>
                        </div>
                        <div className={styles.genres_filter}>
                            <p className={styles.head_text}>Жанры</p>
                            <div className={styles.genres_list}>
                                {genres.map(genre =>
                                    <>
                                        {currentGenres.includes(genre.id) ?
                                            <p
                                                key={genre.id + 1}
                                                onClick={() => deleteGenre(genre.id)}
                                                className={styles.genre + ' ' + styles.genre_current}
                                            >
                                                {genre.name}</p>
                                            :
                                            <p
                                                key={genre.id + 2}
                                                onClick={() => addGenre(genre.id)}
                                                className={styles.genre}
                                            >
                                                {genre.name}
                                            </p>
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.under_line}>
                        <button
                            className={styles.button + ' ' + styles.close}
                            onClick={closePopup}
                        >
                            Закрыть
                        </button>
                        <button
                            onClick={resetFilters}
                            className={styles.button + ' ' + styles.reset}
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Filters;
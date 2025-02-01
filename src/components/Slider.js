import styles from "@/styles/components/Slider.module.css"
import {useEffect, useRef} from "react";

const Slider = ({ min, max, minPrice, maxPrice, setMinPrice, setMaxPrice, step}) => {

    const redLineRef = useRef(null)
    const wrapperRef = useRef(null)

    useEffect(() => {
        const width = wrapperRef.current.offsetWidth;
        const pixelStep = width / ((max - min) / step)
        const pixelLeft = ((minPrice - min) / step) * pixelStep
        redLineRef.current.style.left = pixelLeft + 'px'

        const pixelRight = ((maxPrice - min) / step) * pixelStep
        redLineRef.current.style.width = (pixelRight - pixelLeft) + 'px'
    }, [minPrice, maxPrice])

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
        >
            <div
                ref={redLineRef}
                className={styles.red_line}
            />
            <input
                type="range"
                className={styles.slider}
                min={min}
                max={max}
                step={step}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
                type="range"
                className={styles.slider + ' ' + styles.slider_up}
                min={min}
                max={max}
                step={step}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
        </div>
    );
};

export default Slider;
import {motion} from "framer-motion";

const HeightWrapper = ({dir = "column", children}) => {
    return (
        <motion.div
            className="height"
            style={{display: 'flex', flexDirection: dir}}
        >
            {children}
        </motion.div>
    );
};

export default HeightWrapper;
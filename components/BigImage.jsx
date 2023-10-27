import { motion } from "framer-motion"

export function BigImage() {
    return (
        <div className="big-image">
            <div className="border-titles">
                <motion.h1 className="rotate-title" initial={{ opacity: 0, x: -50}}
                animate={{ opacity: 1, x: 0}}
                transition={{ duration: 3 }}>MovieStats</motion.h1>
                <h2 className="squish-squash-text">En tjänst till MovieFlex</h2>
            </div>
      </div>
    )
}
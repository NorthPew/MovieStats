import { useState } from "react"
import { motion } from "framer-motion"

export const Navbar = () => {
    const [navIsOpen, setNavIsOpen] = useState(false)

    const listItemVariants = {
        open: {
            opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { 
            opacity: 0, y: 20, transition: { duration: 0.2 }
        }
    };

    const listVariants = {
        open: {
            transition: {
                type: "spring", bounce: 0, duration: 0.7, delayChildren: 0.7, staggerChildren: 0.07
            }
        }, 
        closed: {
            transition: {
                type: "spring", bounce: 0, duration: 0.5
            }
        }
    }

    return (
        <>
            <motion.nav initial={false} animate={navIsOpen ? "open" : "closed"}>
                <motion.button onClick={() => setNavIsOpen(!navIsOpen)} whileTap={{scale: 1.25}}>
                    Menu
                </motion.button>
                <motion.ul className={navIsOpen ? "open" : "closed"} variants={listVariants}>
                <motion.li variants={listItemVariants}>
                    Movies by language
                </motion.li>
                <motion.li variants={listItemVariants}>
                    Movie releases by month
                </motion.li>
                <motion.li variants={listItemVariants}>
                    Movie duration
                </motion.li>
                <motion.li variants={listItemVariants}>
                    Movies by genre
                </motion.li>
            </motion.ul>
            </motion.nav>
        </>
    )

}







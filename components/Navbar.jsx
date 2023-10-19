import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { allTheMovies } from "../data/getMovies"


export const Navbar = () => {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const [searchTitle, setSearchTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = allTheMovies.filter(movie => movie.Title.toLowerCase().includes(searchTitle.toLowerCase()));
        setSearchResults(results);
    }, [searchTitle]);


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
                <input type="search" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} />
                {searchResults.map((result, index) => (
                <div key={index}>
                    Titel: {result.Title}
                    {
                        result.Genre === undefined ? 'null' : ` Genre: ${result.Genre}`
                    }
                    Premiär: {result.Premiere}
                    Längd: {result.Runtime}
                    Språk: {result.Language}
                    </div>
            ))}
                <motion.ul className={navIsOpen ? "open" : "closed"} variants={listVariants}>
                    <motion.li whileHover={{scaleY: 1.15}} variants={listItemVariants}>
                        <a href="#movies-by-language">Movies by language</a>
                    </motion.li>
                    <motion.li whileHover={{scaleY: 1.15}} variants={listItemVariants}>
                        <a href="#movie-releases-by-month">Movie releases by month</a>
                    </motion.li>
                    <motion.li whileHover={{scaleY: 1.15}} variants={listItemVariants}>
                        <a href="#movie-durations">Movie durations</a>
                    </motion.li>
                    <motion.li whileHover={{scaleY: 1.15}} variants={listItemVariants}>
                        <a href="#movies-by-genre">Movies by genre</a>
                    </motion.li>
                </motion.ul>
            </motion.nav>
            <div id="navbar-outside" onClick={() => setNavIsOpen(!navIsOpen)} className={navIsOpen ? "open" : "closed"}>

            </div>
        </>
    )

}







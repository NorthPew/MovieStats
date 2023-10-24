import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { allTheCategoryMovies } from "../data/getMovies"


export const Navbar = () => {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const [searchTitle, setSearchTitle] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTitle !== '') {
            const results = allTheCategoryMovies.filter(movie => movie.Title.toLowerCase().includes(searchTitle.toLowerCase()));
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
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
        <div className="placeholder-nav">
            <motion.nav initial={false} animate={navIsOpen ? "open" : "closed"}>
                <h1 className="nav-logo">MovieStats</h1>
                <motion.button onClick={() => setNavIsOpen(!navIsOpen)} whileTap={{scale: 1.25}}>
                    Menu
                </motion.button>
                <input type="search" value={searchTitle} placeholder="Sök efter filmer" onChange={e => setSearchTitle(e.target.value)} />
                <ul className="search-result-container">
                {searchResults.map((result, index) => (
                <li  className="search-result-box"key={index}>
                    <p className="big-text">{result.Title}</p>
                    {   searchResults.length >= 4 ?
                            null
                        : <>
                        {
                            result.Genre === undefined ? null : <p>Genre: {result.Genre}</p>
                        }
                        <p>Premiär: {result.Premiere}</p>
                        <p>Längd: {result.Runtime}</p>
                        <p>Språk: {result.Language}</p>
                    </>
                    } 
                    </li>
            ))}
                </ul>
                <motion.ul id="menu" className={navIsOpen ? "open" : "closed"} variants={listVariants}>
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
        </div>
            <div id="navbar-outside" onClick={() => setNavIsOpen(!navIsOpen)} className={navIsOpen ? "open" : "closed"}>

            </div>
        </>
    )

}
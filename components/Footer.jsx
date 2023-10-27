import { useRef } from "react"
import { motion } from "framer-motion"

import logo from "../movieStats.png"

export function Footer() {

    const constraintsRef = useRef(null);

    return (
        <motion.footer ref={constraintsRef}>
            <motion.section className="footer-branding" drag dragConstraints={constraintsRef}>
                <img src={logo} className="footer-logo" />
            </motion.section>
            <section className="footer-middle">
                <ul>
                    <li >
                        <a className="footer-link" href="#top">Hem</a>
                    </li>
                    <li>
                        <a className="footer-link" href="#movies-by-language">Movies by language</a>
                    </li>
                    <li>
                        <a className="footer-link" href="#movie-releases-by-month">Movie releases by month</a>
                    </li>
                    <li>
                        <a className="footer-link" href="#movie-durations">Movie durations</a>
                    </li>
                    <li>
                        <a className="footer-link" href="#movies-by-genre">Movies by genre</a>
                    </li>
                </ul>
            </section>
        </motion.footer>
    )
}


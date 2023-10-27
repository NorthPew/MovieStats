import { useState } from 'react'
import { motion } from "framer-motion"
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, PointElement,
  LineElement,);
import { Pie, Bar, Line } from "react-chartjs-2"

import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer';

import { getMoviesByLanguagePieConfig, getMoviesByMonthBarsConfig, getMoviesByDurationLineConfig, getMoviesByGenrePieConfig} from '../data/getMovies';


const moviesByLanguagePieConfig = getMoviesByLanguagePieConfig()
const moviesByMonthBarsConfig = getMoviesByMonthBarsConfig()
const moviesByDurationLineConfig = getMoviesByDurationLineConfig()
const moviesByGenrePieConfig = getMoviesByGenrePieConfig()

function App() {
  // For line chart
  const options = {
      scales: {
        x: { 
          display: false // Gömmer labels i X led
        }
      }
  }

  // Framer motion

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1.0,
        staggerChildren: 1.5
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <>  
      <main>
        <Navbar />
        <div className="big-image">
          <div className="border-titles">
            <h1 className="rotate-title">MovieStats</h1>
            <h2 className="squish-squash-text">En tjänst till MovieFlex</h2>
          </div>
        </div>
        <motion.div variants={container} initial="hidden"
      animate="visible">
          <motion.div className="card" variants={item}>
            <h1 className="title">Antal filmer i olika språk</h1>
            <Pie className="chart" id="movies-by-language" data={moviesByLanguagePieConfig} />
          </motion.div>
          <motion.div className="card" variants={item}>
            <h1 className="title">Antal olika sorts filmer per månad</h1>
            <Bar className="chart" id="movie-releases-by-month" data={moviesByMonthBarsConfig} />
          </motion.div>
          <motion.div className="card" variants={item}>
            <h1 className="title">Alla olika filmers längd</h1>
            <Line className="chart" id="movie-durations" data={moviesByDurationLineConfig} options={options} />
          </motion.div>
          <motion.div className="card" variants={item}>
            <h1 className="title">Alla genrer av filmer</h1>
            <Pie className="chart" id="movies-by-genre" data={moviesByGenrePieConfig} />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}

export default App

import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, PointElement,
  LineElement,);
import { Pie, Bar, Line } from "react-chartjs-2"

import { Navbar } from '../components/Navbar'

import { getMoviesByLanguagePieConfig, getMoviesByMonthBarsConfig, getMoviesByDurationLineConfig, getMoviesByGenrePieConfig} from '../data/getMovies';


const moviesByLanguagePieConfig = getMoviesByLanguagePieConfig()
const moviesByMonthBarsConfig = getMoviesByMonthBarsConfig()
const moviesByDurationLineConfig = getMoviesByDurationLineConfig()
const moviesByGenrePieConfig = getMoviesByGenrePieConfig()

function App() {

  const options = () => {
    return {
      scales: {
        x: { 
          display: false // Gömmer labels i X led
        }
      }
    }
  }

  return (
    <main>
      <Navbar />
      <div className="big-image">
        <h1 className="rotate-title">MovieStats</h1>
        <h2 className="squish-squash-text">En tjänst till MovieFlex</h2>
      </div>
      <div className="card">
        <h1 className="title">Antal filmer i olika språk</h1>
        <Pie className="chart" id="movies-by-language" data={moviesByLanguagePieConfig} />
      </div>
      <div className="card">
        <h1 className="title">Antal olika sorts filmer per månad</h1>
        <Bar className="chart" id="movie-releases-by-month" data={moviesByMonthBarsConfig} />
      </div>
      <div className="card">
        <h1 className="title">Alla olika filmers längd</h1>
        <Line className="chart" id="movie-durations" data={moviesByDurationLineConfig} options={options()} />
      </div>
      <div className="card">
        <h1 className="title">Alla genrer av filmer</h1>
        <Pie className="chart" id="movies-by-genre" data={moviesByGenrePieConfig} />
      </div>
    </main>
  )
}

export default App

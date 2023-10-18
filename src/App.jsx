import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement, } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, PointElement,
  LineElement,);
import { Pie, Bar, Line } from "react-chartjs-2"

import { Navbar } from '../components/Navbar'

import { getMoviesByLanguagePieConfig, getMoviesByMonthBarsConfig, getMoviesByDurationLineConfig} from '../data/getMovies';


const moviesByLanguagePieConfig = getMoviesByLanguagePieConfig()
const moviesByMonthBarsConfig = getMoviesByMonthBarsConfig()
const moviesByDurationLineConfig = getMoviesByDurationLineConfig()

function App() {

  return (
    <main>
      <Navbar />
      <Pie id="movies-by-language" data={moviesByLanguagePieConfig} />
      <Bar id="movie-releases-by-month" data={moviesByMonthBarsConfig} />
      <Line id="movie-durations" data={moviesByDurationLineConfig} />
    </main>
  )
}

export default App

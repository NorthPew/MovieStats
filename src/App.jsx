import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
import { Pie, Bar } from "react-chartjs-2"

import { Navbar } from '../components/Navbar'

import { getMoviesByLanguagePieConfig, getMoviesByMonthBarsConfig } from '../data/getMovies';


const moviesByLanguagePieConfig = getMoviesByLanguagePieConfig()

const moviesByMonthBarsConfig = getMoviesByMonthBarsConfig()

function App() {

  return (
    <main>
      <Navbar />
      <Pie id="movies-by-language" data={moviesByLanguagePieConfig} />
      <Bar data={moviesByMonthBarsConfig} />
    </main>
  )
}

export default App

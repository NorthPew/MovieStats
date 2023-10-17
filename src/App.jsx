import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
import { Pie } from "react-chartjs-2"

import { Navbar } from '../components/Navbar'

import { getFeaturedMoviesByLanguagePieConfig } from '../data/getMovies';


const featuredMoviesByLanguagePieConfig = getFeaturedMoviesByLanguagePieConfig()

function App() {

  return (
    <main>
      <Navbar />
      <Pie id="movies-by-language" data={featuredMoviesByLanguagePieConfig} />
    </main>
  )
}

export default App

import featuredMovies from "./feature-films.json"
import documentaries from "./documentaries.json"
import specials from "./specials.json"

const colors = [
    "#279696", "#BAE6ac", "#62A87C", "#C80000", "#6338e2", "#f54242", "#42f5ce", 
    "#f5a442", "#42f542", "#A442F5", "#F542A4", "#42a4f5", "#a4f542", "#f5ce42",
    "#CE42f5", "#42cef5", "#F542CE", "#CEF542", "#42f5a4",
    "#FF5736", "#300C3F", "#C700AA", "#281845", "#FFC360", "#CF5733", "#C700DD",
    "#600C3F", "#5818EE", "#AAF7A6", "#FFC390", "#AF5733", "#C700CC", 
    "#400C3F", "#5818AA", "#DAF7AA", "#FFC550", "#FF57FE",
    "#B70039", "#9FFC3F", "#5818EA", "#DAA7A6", "#FFC330","#FF5777","#C700EE",
    "#900C3B","#FF1845","#DAF333","#FFC3FF","#FF57FF","#C70033","#900CFF",
    "#581833","#FFFF7A6","#FFE300","#FF57CC","#C70020","#900CCC","#581877",
    "#CAF7A6","#AAC300","#EF5733","#C700CE","#920C3F","#581845","DAF7A6",
    "#FFC399","#CC5733","#C70044","#900CEC","#121845","#DAF7A6","#FFC300","#FF5733",
    "#D70039","#9EEC3F","#5818AE","#DAF7E6","#11C300","#FF5773","#C70039","#900C3F",
    "#581800","#DAF7AA"
];

export let allTheCategoryMovies = [
    ...featuredMovies,
    ...documentaries,
    ...specials
]

export function getMoviesByLanguagePieConfig() {

    // Counter for all the languages from the objects in the array using reduce
    const languageCounts = allTheCategoryMovies.reduce((counts, movie) => {
        if(!movie.Language) {
            console.log("Undefined?: ", movie,);
        }
        counts[movie.Language] = (counts[movie.Language] || 0) + 1;
        return counts;
    }, {});

    // This is for labels that is used to distinguish between languages
    let labelsForLanguages = Object.keys(languageCounts);
    console.log(labelsForLanguages);

    // This is used for displaying the chart
    let dataLanguages = Object.values(languageCounts);

    const sortedIndex = dataLanguages.map((count, index) => index).sort((a, b) => dataLanguages[b] - dataLanguages[a]);

    // Sort the languages and data arrays using the sorted indices
    labelsForLanguages = sortedIndex.map(index => labelsForLanguages[index]);
    dataLanguages = sortedIndex.map(index => dataLanguages[index]);

    return {
        labels: labelsForLanguages,
        datasets: [{
            label: 'Movies by Language',
            data: dataLanguages,
            backgroundColor: colors
        }]
    };
}

export function getMoviesByMonthBarsConfig() {
    const allCategories = [featuredMovies, documentaries, specials];
    const categoryLabels = ['Featured Movies', 'Documentaries', 'Specials'];

    let uniqueMonthLabels = [];

    allCategories.forEach(category => {
        category.forEach(movie => {
            let month = movie.Premiere.split(' ')[0];
            if (!uniqueMonthLabels.includes(month)) {
                uniqueMonthLabels.push(month);
            }
        });
    });

    let datasets = allCategories.map((category, index) => {
        let pickOutTheMonths = category.map(movie => {
            let splitDate = movie.Premiere.split(' ');
            let month = splitDate[0];
            return month; 
        });

        let moviesByMonthCounter = pickOutTheMonths.reduce((counts, month) => {
            counts[month] = (counts[month] || 0) + 1;
            return counts;
        }, {});

        let dataPerMonth = uniqueMonthLabels.map(month => moviesByMonthCounter[month] || 0);

        return {
            label: categoryLabels[index],
            data: dataPerMonth,
            backgroundColor: colors[index]
        }
    });

    return {
        labels: uniqueMonthLabels,
        datasets: datasets
    }
}

export function getMoviesByDurationLineConfig() {
    // A function to convert hrs and mins to mins instead
    function convertToMinutes(runtime) {
      const timeParts = runtime.split(' ');
      let minutes = 0;
  
      for (let i = 0; i < timeParts.length; i += 2) {
        if (timeParts[i + 1] === 'h') {
          minutes += parseInt(timeParts[i]) * 60;
        } else if (timeParts[i + 1] === 'min') {
          minutes += parseInt(timeParts[i]);
        }
      }
      return minutes;
    }
  
    // Converts all the movies to mins
    allTheCategoryMovies.forEach(movie => {
      movie.Runtime = convertToMinutes(movie.Runtime);
    });
  
    // Sort the movies by runtime
    allTheCategoryMovies.sort((a, b) => a.Runtime - b.Runtime);
  
    return {
      labels: allTheCategoryMovies.map(movie => movie.Title),
      datasets: [
        {
          label: 'Movie Length in Minutes',
          data: allTheCategoryMovies.map(movie => movie.Runtime),
          fill: false,
          backgroundColor: '#279696',
        },
      ]
    }
  }

export function getMoviesByGenrePieConfig() {

    // Counter for all the genre from the objects in the array using reduce
    const genreCounts = allTheCategoryMovies.reduce((counts, movie) => {
        // Only count the movie if it has a genre
        if (movie.Genre === undefined) {
            movie.Genre = "Documentary"
        }
        counts[movie.Genre] = (counts[movie.Genre] || 0) + 1;
        return counts;
    }, {});

    // This is for labels that is used to distinguish between languages
    let labelsForGenres = Object.keys(genreCounts);

    // This is used for displaying the chart
    let dataGenres = Object.values(genreCounts);

    const sortedIndex = dataGenres.map((count, index) => index).sort((a, b) => dataGenres[b] - dataGenres[a]);

    // Sort the languages and data arrays using the sorted indices
    labelsForGenres = sortedIndex.map(index => labelsForGenres[index]);
    dataGenres = sortedIndex.map(index => dataGenres[index]);

    return {
        labels: labelsForGenres,
        datasets: [{
            label: "Movies by Genre",
            data: dataGenres,
            backgroundColor: colors
        }]
    }
}
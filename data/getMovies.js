import featuredMovies from "./feature-films.json"
import documentaries from "./documentaries.json"
import specials from "./specials.json"

const colors = ["#279696", "#bae6ac", "#62a87c", "#c80000", "#6338e2", "#f54242", "#42f5ce", "#f5a442", "#42f542", "#a442f5", "#f542a4", "#42a4f5", "#a4f542", "#f5ce42", "#ce42f5", "#42cef5", "#f542ce", "#cef542", "#42f5a4"]

let allTheMovies = [
    ...featuredMovies,
    ...documentaries,
    ...specials
]

export function getMoviesByLanguagePieConfig() {

    // Counter for all the languages from the objects in the array using reduce
    const languageCounts = allTheMovies.reduce((counts, movie) => {
        counts[movie.Genre] = (counts[movie.Genre] || 0) + 1;
        return counts;
    }, {});

    // This is for labels that is used to distinguish between languages
    let labelsForLanguages = Object.keys(languageCounts);

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

    // Splitting all the months using map and split
    let pickOutTheMonths = allTheMovies.map(movie => {
        let splitDate = movie.Premiere.split(' ');
        let month = splitDate[0];
        return month; 
    });

    let uniqueMonthLabels = pickOutTheMonths.filter((month, index) => pickOutTheMonths.indexOf(month) === index);

    let moviesByMonthCounter = pickOutTheMonths.reduce((counts, month) => {
        counts[month] = (counts[month] || 0) + 1;
        return counts;
    }, {});

    let dataPerMonth = uniqueMonthLabels.map(month => moviesByMonthCounter[month])

    return {
        labels: uniqueMonthLabels,
        datasets: [{
            label: 'Movie Premieres',
            data: dataPerMonth,
            backgroundColor: colors
        }]
    }
}

export function getMoviesByDurationLineConfig() {

    let pickOutTheDurations = allTheMovies.map(movie => {
        let splitTheTime = movie.Runtime.split(' ')
        return `${splitTheTime[0]}${splitTheTime[1]}`
    })

    pickOutTheDurations.sort()

    let moviesByDurationCounter = pickOutTheDurations.reduce((counts, time) => {
        counts[time] = (counts[time] || 0) + 1;
        return counts;
    }, {})

    return {
        datasets: [{
            label: "Movies by Duration",
            data: moviesByDurationCounter,
            backgroundColor: colors
        }]
    }
}

export function getMoviesByGenrePieConfig() {

    // Counter for all the genre from the objects in the array using reduce
    const genreCounts = allTheMovies.reduce((counts, movie) => {
        // Only count the movie if it has a genre
        if (movie.Genre && movie.Genre.trim() !== '') {
            counts[movie.Genre] = (counts[movie.Genre] || 0) + 1;
        }
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
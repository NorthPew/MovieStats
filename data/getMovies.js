import featuredMovies from "./feature-films.json"
import documentaries from "./documentaries.json"
import specials from "./specials.json"

const colors = [
    "#279696", "#bae6ac", "#62a87c", "#c80000", "#6338e2", "#f54242", "#42f5ce", 
    "#f5a442", "#42f542", "#a442f5", "#f542a4", "#42a4f5", "#a4f542", "#f5ce42",
    "#ce42f5", "#42cef5", "#f542ce", "#cef542", "#42f5a4",
    "#FF5733", "#900C3F", "#C70039", "#581845", "#FFC300", "#FF5733", "#C70039",
    "#900C3F", "#581845", "#DAF7A6", "#FFC300", "#FF5733", "#C70039", 
    "#900C3F", "#581845", "#DAF7A6", "#FFC300", "#FF5733",
    "#C70039", "#900C3F", "#581845", "#DAF7A6", "#FFC300","#FF5733","#C70039",
    "#900C3F","#581845","#DAF7A6","#FFC300","#FF5733","#C70039","#900C3F",
    "581845","#DAF7A6","#FFC300","#FF5733","#C70039","#900C3F","#581845",
    "DAF7A6","#FFC300","#FF5733","#C70039","#900C3F","#581845","DAF7A6",
    "FFC300","FF5733","C70039","900C3F","581845","DAF7A6","FFC300","FF5733",
    "C70039","900C3F","581845","DAF7A6","FFC300","FF5733","C70039","900C3F",
    "581845","DAF7A6"
];

export let allTheCategoryMovies = [
    ...featuredMovies,
    ...documentaries,
    ...specials
]

export function getMoviesByLanguagePieConfig() {

    // Counter for all the languages from the objects in the array using reduce
    const languageCounts = allTheCategoryMovies.reduce((counts, movie) => {
        counts[movie.Language] = (counts[movie.Language] || 0) + 1;
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

    let pickOutTheDurations = allTheCategoryMovies.map(movie => {
        let splitTheTime = movie.Runtime.split(' ');
        let durationInMinutes;
        if (splitTheTime.length === 2) { // If the movie duration is in minutes
            durationInMinutes = parseInt(splitTheTime[0]);
        } else { // If the movie duration is in hours and minutes
            let hours = parseInt(splitTheTime[0]);
            let minutes = parseInt(splitTheTime[2]);
            durationInMinutes = hours * 60 + minutes;
        }
        return durationInMinutes;
    });

    let moviesByDurationCounter = pickOutTheDurations.reduce((counts, time) => {
        counts[time] = (counts[time] || 0) + 1;
        return counts;
    }, {});
    
    let data = Object.keys(moviesByDurationCounter).map(duration => {
        return {
            x: duration, // Antal minuter som filmerna är i X-led
            y: moviesByDurationCounter[duration] // Antal filmer som är x antal minuter i Y-led
        };
    });
    
    return {
        datasets: [{
            label: "Movies by Duration",
            data: data,
            backgroundColor: colors
        }]
    }
}

export function getMoviesByGenrePieConfig() {

    // Counter for all the genre from the objects in the array using reduce
    const genreCounts = allTheCategoryMovies.reduce((counts, movie) => {
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
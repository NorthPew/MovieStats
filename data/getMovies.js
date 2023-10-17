import featuredMovies from "./feature-films.json"
import documentaries from "./documentaries.json"
import specials from "./specials.json"

const colors = ["#279696", "#bae6ac", "#62a87c", "#c80000", "#6338e2", "#f54242", "#42f5ce", "#f5a442", "#42f542", "#a442f5", "#f542a4", "#42a4f5", "#a4f542", "#f5ce42", "#ce42f5", "#42cef5", "#f542ce", "#cef542", "#42f5a4"]


export function getFeaturedMoviesByLanguagePieConfig() {

    // Counter for all the languages from the objects in the array using reduce
    const languageCounts = featuredMovies.reduce((counts, movie) => {
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
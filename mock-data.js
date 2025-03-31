// Mock movie data
const mockMovies = [
    {
        id: 1,
        title: "Stranger Things",
        year: 2016,
        type: "TV Show",
        rating: "97%",
        maturity: "TV-14",
        image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg",
        genres: ["Sci-Fi", "Horror", "Drama"]
    },
    {
        id: 2,
        title: "The Witcher",
        year: 2019,
        type: "TV Show",
        rating: "89%",
        maturity: "TV-MA",
        image: "https://images.pexels.com/photos/3992943/pexels-photo-3992943.jpeg",
        genres: ["Fantasy", "Action", "Adventure"]
    },
    // Add more mock data as needed
];

// Mock search function
function searchMovies(query, filters = {}) {
    return new Promise(resolve => {
        setTimeout(() => {
            const results = mockMovies.filter(movie => {
                const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
                const matchesType = !filters.type || movie.type === filters.type;
                const matchesGenre = !filters.genre || movie.genres.includes(filters.genre);
                return matchesQuery && matchesType && matchesGenre;
            });
            resolve(results);
        }, 500); // Simulate network delay
    });
}

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { searchMovies };
}
const movieService = (() => {
    function getAllMovies() {
        return kinvey.get('appdata', 'movies', 'kinvey');
    }

    function createMovie(movie) {
        return kinvey.post('appdata', 'movies', 'kinvey', movie);
    }

    function getMovieById(id) {
        return kinvey.get('appdata', `movies/${id}`, 'kinvey');
    }

    function deleteMovie(id){
        return kinvey.remove('appdata', `movies/${id}`, 'kinvey');
    }

    function updateMovie(id, movie){
        return kinvey.update('appdata', `movies/${id}`, 'kinvey', movie);
    }

    return {
        getAllMovies,
        createMovie,
        getMovieById,
        deleteMovie,
        updateMovie
    }
})()
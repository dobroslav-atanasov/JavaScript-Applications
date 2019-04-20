// CINEMA
handlers.getCinema = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        movie: './templates/movie.hbs'
    }).then(function () {
        movieService.getAllMovies()
            .then((movies) => {
                let orderMovies = movies.sort((a, b) => b.tickets - a.tickets);
                this.partial('./templates/cinema.hbs', {
                    movies: orderMovies
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET CREATE MOVIE
handlers.getCreateMovie = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

// POST CREATE MOVIE
handlers.postCreateMovie = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    let movie = {
        title: context.params.title,
        imageUrl: context.params.imageUrl,
        description: context.params.description,
        genres: context.params.genres,
        tickets: context.params.tickets
    }

    if (movie.title.length < 6) {
        notifications.showError('Title must be at least 6 symbols!');
        context.redirect('#/create');
        return;
    }

    if (movie.description.length < 6) {
        notifications.showError('Description must be at least 10 symbols!');
        context.redirect('#/create');
        return;
    }

    if (movie.genres.length < 3) {
        notifications.showError('Genres must be at least 3 symbols!');
        context.redirect('#/create');
        return;
    }

    if (movie.imageUrl.startsWith('http://') || movie.imageUrl.startsWith('https://')) {
        movieService.createMovie(movie)
            .then((res) => {
                notifications.showInfo('Movie created successfully.');
                context.redirect('#/home');
            }).catch(function (err) {
                console.log(err);
            })
    } else {
        notifications.showError('Image URL must start with http:// or https://!');
        context.redirect('#/create');
        return;
    }
}

// MY MOVIES
handlers.getMyMovies = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        mymovie: './templates/mymovie.hbs'
    }).then(function () {
        movieService.getAllMovies()
            .then((movies) => {
                let orderMovies = movies.filter(m => m._acl.creator === sessionStorage.getItem('userId')).sort((a, b) => b.tickets - a.tickets);
                this.partial('./templates/mymovies.hbs', {
                    movies: orderMovies
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// DETAILS
handlers.detailsMovie = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        movieService.getMovieById(context.params.id)
            .then((movie) => {
                this.partial('./templates/details.hbs', {
                    movie: movie
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET DELETE
handlers.getDeleteMovie = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        movieService.getMovieById(context.params.id)
            .then((movie) => {
                this.partial('./templates/delete.hbs', {
                    movie: movie
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// POST DELETE
handlers.postDeleteMovie = function (context) {
    movieService.deleteMovie(context.params.id)
        .then((res) => {
            notifications.showInfo('Movie removed successfully!');
            context.redirect('#/home');
        }).catch(function (err) {
            console.log(err);
        });
}

// GET EDIT
handlers.getEditMovie = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        movieService.getMovieById(context.params.id)
            .then((movie) => {
                this.partial('./templates/edit.hbs', {
                    movie: movie
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// POST EDIT
handlers.postEditMovie = function (context) {
    let movie = {
        title: context.params.title,
        imageUrl: context.params.imageUrl,
        description: context.params.description,
        genres: context.params.genres,
        tickets: context.params.tickets
    }

    movieService.updateMovie(context.params.id, movie)
        .then((res) => {
            notifications.showInfo(`Movie ${movie.title} was updated!`);
            context.redirect('#/mymovies');
        }).catch(function (err) {
            console.log(err);
        });
}

// BUY TICKET
handlers.buyTicket = function (context) {
    movieService.getMovieById(context.params.id)
        .then((movie) => {
            if (movie.tickets === 0) {
                notifications.showError(`The movie ${movie.title} has no free tickets!`);
            } else {
                movie.tickets--;
                movieService.updateMovie(context.params.id, movie)
                    .then((res) => {
                        notifications.showInfo(`Successfully bought ticket for ${movie.title}!`)
                        context.redirect('#/cinema');
                    });
            }
        }).catch(function (err) {
            console.log(err);
        })
}
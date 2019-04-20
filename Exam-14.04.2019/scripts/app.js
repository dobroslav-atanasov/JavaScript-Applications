const handlers = {}

$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // HOME
    this.get('/index.html', handlers.getHome);
    this.get('/', handlers.getHome);
    this.get('#/home', handlers.getHome);

    // REGISTER
    this.get('#/register', handlers.getRegister);
    this.post('#/register', handlers.registerUser);

    // LOGIN 
    this.get('#/login', handlers.getLogin);
    this.post('#/login', handlers.loginUser);

    // LOGOUT
    this.get('#/logout', handlers.logoutUser);

    // CINEMA
    this.get('#/cinema', handlers.getCinema);

    // CREATE MOVIE
    this.get('#/create', handlers.getCreateMovie);
    this.post('#/create', handlers.postCreateMovie);

    // MY MOVIES
    this.get('#/mymovies', handlers.getMyMovies);

    // DETAILS
    this.get('#/details/:id', handlers.detailsMovie);

    // DELETE
    this.get('#/delete/:id', handlers.getDeleteMovie);
    this.post('#/delete/:id', handlers.postDeleteMovie);

    // EDIT
    this.get('#/edit/:id', handlers.getEditMovie);
    this.post('#/edit/:id', handlers.postEditMovie);

    // BUY TICKET
    this.get('#/buyticket/:id', handlers.buyTicket);
  });
  
  app.run();
});
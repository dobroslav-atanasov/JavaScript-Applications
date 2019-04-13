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

    // CATALOG
    this.get('#/catalog', handlers.getCatalog);

    // CREATE
    this.get('#/create', handlers.getCreate);
    this.post('#/create', handlers.createCar);

    // MY LISTINGS
    this.get('#/mylistings', handlers.getMyListings);
  });

  app.run();
});
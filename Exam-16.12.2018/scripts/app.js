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

    // // home page routes
    // this.get('/index.html', handlers.getHome);
    // this.get('/', handlers.getHome);
    // this.get('#/home', handlers.getHome);

    // // user routes
    // this.get('#/register', handlers.getRegister);
    // this.get('#/login', handlers.getLogin);

    // this.post('#/register', handlers.registerUser);
    // this.post('#/login', handlers.loginUser);
    // this.get('#/logout', handlers.logoutUser);

    // // ADD YOUR ROUTES HERE
  });
  app.run();
});
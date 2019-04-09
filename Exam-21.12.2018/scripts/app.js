const handlers = {}

$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    // HOME
    this.get('/idnex.html', handlers.getHome);
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

    // CREATE SONG
    this.get('#/create', handlers.getCreateSong);
    this.post('#/create', handlers.postCreateSong);

    // ALL SONGS
    this.get('#/allsongs', handlers.getAllSongs);

    // MY SONGS
    this.get('#/mysongs', handlers.getMySongs);

    // LIKE SONG
    this.get('#/like', handlers.likeSong);

    // LISTEN SONG

    // REMOVE SONG
  });
  
  app.run();
});
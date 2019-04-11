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

    // ALL PETS
    this.get('#/dashboard', handlers.getAllPets);

    // ADD PET
    this.get('#/add', handlers.getAddPet);
    this.post('#/add', handlers.postAddPet);

    // MY PETS
    this.get('#/mypets', handlers.getMyPets);

    // CATEGORIS
    this.get('#/all', handlers.getAll);
    this.get('#/cats', handlers.getCats);
    this.get('#/dogs', handlers.getDogs);
    this.get('#/parrots', handlers.getParrots);
    this.get('#/reptiles', handlers.getReptiles);
    this.get('#/other', handlers.getOther);

    // EDIT

    // PET

    // DELETE
  });
  app.run();
});
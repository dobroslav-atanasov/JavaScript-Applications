// GET ALL PETS
handlers.getAllPets = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x._acl.creator !== sessionStorage.getItem('userId'));
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET ADD PET
handlers.getAddPet = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/add.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

// POST ADD PET
handlers.postAddPet = function (context) {
    let name = context.params.name;
    let description = context.params.description;
    let imageURL = context.params.imageURL;
    let category = context.params.category;

    if (name === undefined || description === undefined || imageURL === undefined) {
        notification.showError('Invalid pet details!');
        context.redirect('#/add');
        return;
    }

    petService.addPet(name, description, imageURL, category).then((res) => {
        notifications.showInfo('Pet created.');
        context.redirect('#/dashboard');
    }).catch(function (err) {
        console.log(err);
    });
}

// GET MY PET
handlers.getMyPets = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        myPets: './templates/mypet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let myPets = pets.filter(x => x._acl.creator === sessionStorage.getItem('userId'));
                context.pets = myPets;
                this.partial('./templates/mypets.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET ALL
handlers.getAll = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x._acl.creator !== sessionStorage.getItem('userId'));
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET CATS
handlers.getCats = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x.category === 'Cat' && x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET DOGS
handlers.getDogs = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x.category === 'Dog' && x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET PARROTS
handlers.getParrots = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x.category === 'Parrot' && x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET REPTILES
handlers.getReptiles = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x.category === 'Reptile' && x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET OTHER
handlers.getOther = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        pet: './templates/pet.hbs'
    }).then(function () {
        petService.getAllPets()
            .then((pets) => {
                let otherPets = pets.filter(x => x.category === 'Other' && x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                context.pets = otherPets;
                this.partial('./templates/dashboard.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}
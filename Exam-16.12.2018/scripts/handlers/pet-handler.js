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

// GET DETAILS
handlers.getDetailsPet = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        let id = context.params.id;
        petService.getPet(id)
            .then((pet) => {
                let isCreator = (sessionStorage.getItem('userId') === pet._acl.creator);
                this.partial('./templates/details.hbs', {
                    user: isCreator,
                    pet: pet
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// POST DETAILS
handlers.postDetailsPet = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        petService.getPet(context.params.id)
            .then((pet) => {
                pet.description = context.params.description;
                petService.editPet(context.params.id, pet)
                    .then((res) => {
                        notifications.showInfo('Updated successfully!');
                        context.redirect('#/dashboard');
                    }).catch(function (err) {
                        console.log(err);
                    });
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// REMOVE PET
handlers.removePet = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        petService.remove(context.params.id)
            .then((res) => {
                notifications.showInfo('Pet removed successfully!');
                context.redirect('#/dashboard');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}
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
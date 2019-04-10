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
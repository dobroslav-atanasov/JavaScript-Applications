handlers.getAllPets = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');
    
    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/dashboard.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}
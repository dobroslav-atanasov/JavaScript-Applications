handlers.getCatalog = function (context) {
    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/catalog.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}
// GET CATALOG
handlers.getCatalog = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        car: './templates/car.hbs'
    }).then(function () {
        carService.getCars()
            .then((cars) => {
                Array.from(cars).forEach(c => {
                    if (c.seller === sessionStorage.getItem('username')) {
                        c.isMyCar = true;
                    } else {
                        c.isMyCar = false;
                    }
                });
                this.partial('./templates/catalog.hbs', {
                    haveCars: cars.length !== 0,
                    cars: cars
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET CREATE
handlers.getCreate = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/create.hbs')
    }).catch(function (err) {
        console.log(err);
    });
}

// POST CREATE
handlers.createCar = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    let car = {
        title: context.params.title,
        description: context.params.description,
        brand: context.params.brand,
        fuel: context.params.fuelType,
        model: context.params.model,
        year: context.params.year,
        imageUrl: context.params.imageUrl,
        price: context.params.price,
        seller: sessionStorage.getItem('username')
    }

    carService.createCar(car)
        .then((res) => {
            notifications.showInfo('Listing created.');
            context.redirect('#/catalog');
        }).catch(function (err) {
            console.log(err);
        });
}

// GET MY LISTINGS
handlers.getMyListings = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        car: './templates/car.hbs'
    }).then(function () {
        carService.getCars()
            .then((cars) => {
                Array.from(cars).forEach(c => {
                    if (c.seller === sessionStorage.getItem('username')) {
                        c.isMyCar = true;
                    } else {
                        c.isMyCar = false;
                    }
                });
                this.partial('./templates/mylistings.hbs', {
                    haveCars: cars.filter(x => x.seller === sessionStorage.getItem('username')).length !== 0,
                    cars: cars.filter(x => x.seller === sessionStorage.getItem('username'))
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// DETAILS
handlers.getDetails = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        carService.getCar(context.params.id)
            .then((car) => {
                this.partial('./templates/details.hbs', {
                    car: car
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET EDIT
handlers.getEdit = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        carService.getCar(context.params.id)
            .then((car) => {
                this.partial('./templates/edit.hbs', {
                    car: car
                });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// POST EDIT
handlers.postEdit = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    let car = {
        title: context.params.title,
        description: context.params.description,
        brand: context.params.brand,
        fuel: context.params.fuelType,
        model: context.params.model,
        year: context.params.year,
        imageUrl: context.params.imageUrl,
        price: context.params.price,
        seller: sessionStorage.getItem('username')
    }

    carService.editCar(context.params.id, car)
        .then((res) => {
            notifications.showInfo(`Listing ${context.params.title} updated.`);
            context.redirect('#/catalog');
        }).catch(function (err) {
            console.log(err);
        });
}

// DELETE
handlers.deleteCar = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    carService.deleteCar(context.params.id)
        .then((res) => {
            notifications.showInfo(`Listing deleted.`);
            context.redirect('#/catalog');
        }).catch(function (err) {
            console.log(err);
        });
}
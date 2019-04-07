/// <reference path="../typings/globals/jquery/index.d.ts" />

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        // Home
        this.get('#/home', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        });

        // About
        this.get('#/about', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        // Login
        this.get('#/login', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        // Register
        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs',
            }).then(function(){
                this.partial('./templates/register/registerPage.hbs');
            });
        });
    });

    app.run('#/');
});
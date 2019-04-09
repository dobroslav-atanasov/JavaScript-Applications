// REGISTER
handlers.getRegister = function (ctx) {
  ctx.loadPartials({
    header: './templates/header.hbs',
    footer: './templates/footer.hbs'
  }).then(function () {
    this.partial('./templates/register.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.registerUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  if (username.length < 3) {
    notify.showError('Username must be at least 3 symbols!');
    ctx.redirect('#/register');
    return;
  }
  if (password.length < 6) {
    notify.showError('Password must be at least 6 symbols!');
    ctx.redirect('#/register');
    return;
  }
  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notify.showInfo('User registration successful.');
    ctx.redirect('#/allsongs');
  }).catch(function (err) {
    notify.showError('Invalid username or password!');
    ctx.redirect('#/register');
  });
}

// LOGIN
handlers.getLogin = function (ctx) {
  ctx.loadPartials({
    header: './templates/header.hbs',
    footer: './templates/footer.hbs'
  }).then(function () {
    this.partial('./templates/login.hbs');
  }).catch(function (err) {
    console.log(err);
  });
}

handlers.loginUser = function (ctx) {
  let username = ctx.params.username;
  let password = ctx.params.password;
  userService.login(username, password).then((res) => {
    userService.saveSession(res);
    notify.showInfo('Login successful.');
    ctx.redirect('#/allsongs');
  }).catch(function (err) {
    notify.showError('Invalid username or password!');
    ctx.redirect('#/login');
  });
}

// LOGOUT
handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notify.showInfo('Logout successful.');
    ctx.redirect('#/home');
  })
}
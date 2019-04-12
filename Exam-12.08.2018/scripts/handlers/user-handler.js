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
  let repeatPassword = ctx.params.repeatPass;

  if (username.length < 3) {
    notifications.showError('Username must be at least 3 symbols!');
    return;
  }
  
  if (password.length < 6) {
    notifications.showError('Password must be at least 3 symbols!');
    return;
  }

  if (repeatPassword !== password) {
    notifications.showError('Passwords must match!');
    return;
  }

  userService.register(username, password).then((res) => {
    userService.saveSession(res);
    notifications.showInfo('User registration successful.');
    ctx.redirect('#/catalog');
  }).catch(function (err) {
    notifications.showError(err.responseJSON.description);
  });
}

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
    notifications.showInfo('Login successful.');
    ctx.redirect('#/catalog');
  }).catch(function (err) {
    notifications.showError('Invalid username or password!');
    ctx.redirect('#/login');
  });
}

handlers.logoutUser = function (ctx) {
  userService.logout().then(() => {
    sessionStorage.clear();
    notifications.showInfo('User logged out successfully');
    ctx.redirect('#/home');
  })
}
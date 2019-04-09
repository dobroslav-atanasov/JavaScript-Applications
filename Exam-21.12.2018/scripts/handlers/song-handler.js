// GET CREATE SONG
handlers.getCreateSong = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs'
    }).then(function () {
        this.partial('./templates/create.hbs');
    }).catch(function (err) {
        console.log(err);
    });
}

// POST CREATE SONG
handlers.postCreateSong = function (context) {
    let title = context.params.title;
    let artist = context.params.artist;
    let imageURL = context.params.imageURL;

    if (title.length < 6) {
        notify.showError('Title must be at least 6 symbols!');
        context.redirect('#/create');
        return;
    }

    if (artist.length < 3) {
        notify.showError('Artist must be at least 6 symbols!');
        context.redirect('#/create');
        return;
    }

    if (imageURL.startsWith('http://') || imageURL.startsWith('https://')) {
        songService.createSong(title, artist, imageURL)
            .then((res) => {
                notify.showInfo('Song created successfully.');
                context.redirect('#/create');
            }).catch(function (err) {
                notify.showError('Song was not created!');
                context.redirect('#/create');
            });
    } else {
        notify.showError('Invalid image!');
        context.redirect('#/create');
        return;
    }
}

// GET ALL SONGS
handlers.getAllSongs = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        songs: './templates/songs.hbs'
    }).then(function () {
        songService.getSongs()
            .then((songs) => {
                let otherSongs = songs.filter(x => x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => a.likes - b.likes);
                let mySongs = songs.filter(x => x._acl.creator === sessionStorage.getItem('userId')).sort((a, b) => a.likes - b.likes);

                context.otherSongs = otherSongs;
                context.mySongs = mySongs;
                this.partial('./templates/allsongs.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// GET MY SONGS 
handlers.getMySongs = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        mysong: './templates/mysong.hbs'
    }).then(function () {
        songService.getSongs()
            .then((songs) => {
                let mySongs = songs.filter(x => x._acl.creator === sessionStorage.getItem('userId')).sort((a, b) => a.likes - b.likes);

                context.mySongs = mySongs;
                this.partial('./templates/mysongs.hbs');
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// LIKE SONG
handlers.likeSong = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        songs: './templates/songs.hbs'
    }).then(function () {

    }).catch(function (err) {
        console.log(err);
    });
}

// LISTEN SONG

// REMOVE SONG
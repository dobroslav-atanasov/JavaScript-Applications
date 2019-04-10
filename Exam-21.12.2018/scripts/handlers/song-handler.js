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
                let otherSongs = songs.filter(x => x._acl.creator !== sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);
                let mySongs = songs.filter(x => x._acl.creator === sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);

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
                let mySongs = songs.filter(x => x._acl.creator === sessionStorage.getItem('userId')).sort((a, b) => b.likes - a.likes);

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
        let songId = document.URL.substring(document.URL.lastIndexOf('/') + 2);
        songService.getSongById(songId)
            .then((song) => {
                song.likes++;
                songService.likeSong(songId, song)
                    .then((res) => {
                        notify.showInfo('Liked!');
                        songService.getSongs()
                            .then((songs) => {
                                context.redirect('#/allsongs');
                            }).catch(function (err) {
                                console.log(err);
                            });
                    });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// LISTEN SONG
handlers.listenSong = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        songs: './templates/songs.hbs'
    }).then(function () {
        let songId = document.URL.substring(document.URL.lastIndexOf('/') + 2);
        songService.getSongById(songId)
            .then((song) => {
                song.listen++;
                songService.listenSong(songId, song)
                    .then((res) => {
                        notify.showInfo(`You just listened ${song.title}`);
                        songService.getSongs()
                            .then((songs) => {
                                context.redirect('#/allsongs');
                            }).catch(function (err) {
                                console.log(err);
                            });
                    });
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });
}

// REMOVE SONG
handlers.removeSong = function (context) {
    context.isAuth = userService.isAuth();
    context.username = sessionStorage.getItem('username');

    context.loadPartials({
        header: './templates/header.hbs',
        footer: './templates/footer.hbs',
        songs: './templates/songs.hbs'
    }).then(function () {
        let songId = document.URL.substring(document.URL.lastIndexOf('/') + 2);
        songService.removeSong(songId).then((res) => {
            notify.showInfo('Song removed successfully!');
            songService.getSongs()
                .then((songs) => {
                    context.redirect('#/allsongs');
                }).catch(function (err) {
                    console.log(err);
                });
        }).catch(function (err) {
            console.log(err);
        });
    }).catch(function (err) {
        console.log(err);
    });
}
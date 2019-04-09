const songService = (() => {
    function createSong(title, artist, imageURL) {
        return kinvey.post('appdata', 'songs', 'kinvey', {
            title,
            artist,
            imageURL,
            likes: 0,
            listen: 0
        });
    }

    function getSongs() {
        return kinvey.get('appdata', 'songs', 'kinvey');
    }

    function getMySongs() {
        return kinvey.get('appdata', 'songs', 'kinvey');
    }

    return {
        createSong,
        getSongs,
        getMySongs
    }
})()
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

    function removeSong(songId) {
        return kinvey.remove('appdata', `songs/${songId}`, 'kinvey');
    }

    function getSongById(songId) {
        return kinvey.get('appdata', `songs/${songId}`, 'kinvey');
    }

    function likeSong(songId, song) {
        return kinvey.update('appdata', `songs/${songId}`, 'kinvey', song);
    }

    function listenSong(songId, song) {
        return kinvey.update('appdata', `songs/${songId}`, 'kinvey', song);
    }

    return {
        createSong,
        getSongs,
        getMySongs,
        removeSong,
        getSongById,
        likeSong,
        listenSong
    }
})()
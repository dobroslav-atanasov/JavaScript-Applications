const petService = (() => {
    function getAllPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    return {
        getAllPets
    }
})()
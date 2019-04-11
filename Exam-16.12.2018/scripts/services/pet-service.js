const petService = (() => {
    function getAllPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    function addPet(name, description, imageURL, category) {
        return kinvey.post('appdata', 'pets', 'kinvey', {
            name,
            description,
            imageURL,
            category,
            likes: 0
        });
    }

    function getPet(id) {
        return kinvey.get('appdata', `pets/${id}`, 'kinvey');
    }

    function editPet(id, pet) {
        return kinvey.update('appdata', `pets/${id}`, 'kinvey', pet);
    }

    function remove(id) {
        return kinvey.remove('appdata', `pets/${id}`, 'kinvey');
    }

    return {
        getAllPets,
        addPet,
        getPet,
        editPet,
        remove
    }
})()
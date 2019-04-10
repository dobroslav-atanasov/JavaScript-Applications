const petService = (() => {
    function getAllPets() {
        return kinvey.get('appdata', 'pets', 'kinvey');
    }

    function addPet(name, description, imageURL, category){
        return kinvey.post('appdata', 'pets', 'kinvey', {
            name,
            description,
            imageURL,
            category,
            likes: 0
        });
    }

    return {
        getAllPets,
        addPet
    }
})()
const carService = (() => {
    function getCars() {
        return kinvey.get('appdata', 'cars', 'kinvey');
    }

    function createCar(car) {
        return kinvey.post('appdata', 'cars', 'kinvey', car);
    }

    function getCar(id) {
        return kinvey.get('appdata', `cars/${id}`, 'kinvey');
    }

    function editCar(id, car) {
        return kinvey.update('appdata', `cars/${id}`, 'kinvey', car);
    }

    function deleteCar(id) {
        return kinvey.remove('appdata', `cars/${id}`, 'kinvey');
    }

    return {
        getCars,
        createCar,
        getCar,
        editCar,
        deleteCar
    }
})()
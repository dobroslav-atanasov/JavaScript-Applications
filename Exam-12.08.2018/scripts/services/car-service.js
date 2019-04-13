const carService = (() =>{
    function getCars() {
        return kinvey.get('appdata', 'cars', 'kinvey');
    }

    function createCar(car){
        return kinvey.post('appdata', 'cars', 'kinvey', car);
    }

    return {
        getCars,
        createCar
    }
})()
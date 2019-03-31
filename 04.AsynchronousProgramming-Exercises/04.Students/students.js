function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students';
    const username = 'guest';
    const password = 'guest';
    const token = btoa(`${username}:${password}`);
    const header = { "Authorization": "Basic " + token };

    createStudent();
    getStudents();

    async function getStudents() {
        try {
            let students = await $.ajax({
                method: 'GET',
                url: url,
                headers: header
            });

            let orderStudents = Array.from(students).sort((a, b) => a.ID - b.ID);
            let $results = $('#results');
            orderStudents.forEach(s => {
                let $tr = $('<tr>');
                $tr.append(`<td>${s.ID}</td>`);
                $tr.append(`<td>${s.FirstName}</td>`);
                $tr.append(`<td>${s.LastName}</td>`);
                $tr.append(`<td>${s.FacultyNumber}</td>`);
                $tr.append(`<td>${s.Grade}</td>`);
                $results.append($tr);
            });
        } catch (error) {
            console.log(error)
        }
    }

    async function createStudent() {
        try {
            await $.ajax({
                method: 'POST',
                url: url,
                headers: header,
                data: {
                    ID: 3,
                    FirstName: "Test",
                    LastName: "Test",
                    FacultyNumber: "123",
                    Grade: 2
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
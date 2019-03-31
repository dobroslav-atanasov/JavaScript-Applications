function attachEvents() {
    const countryUrl = 'https://baas.kinvey.com/appdata/kid_B1TwH40d4/countries';
    const townUrl = 'https://baas.kinvey.com/appdata/kid_B1TwH40d4/towns';
    const username = 'User';
    const password = 'User';
    const token = btoa(`${username}:${password}`);
    const header = { "Authorization": `Basic ${token}` };

    $('#showBtn').on('click', showCountries);
    $('#createCountryBtn').on('click', createCountry);
    $('#createTownBtn').on('click', createTown);

    async function showCountries() {
        try {
            let countries = await $.ajax({
                method: 'GET',
                url: countryUrl,
                headers: header
            });

            appendCountries(countries);
        } catch (error) {
            console.log(error);
        }
    }

    async function createCountry() {
        await $.ajax({
            method: 'POST',
            url: countryUrl,
            headers: header,
            data: {
                name: $('#countryName').val()
            }
        });

        $('#countryName').val('');
        $('#countries div').empty();
        showCountries();
    }

    async function createTown() {
        let countries = await $.ajax({
            method: 'GET',
            url: countryUrl,
            headers: header
        });

        let country = countries.filter(c => c.name === $('#townCountryName').val())[0];
        if (country) {
            await $.ajax({
                method: 'POST',
                url: townUrl,
                headers: header,
                data: {
                    name: $('#townName').val(),
                    country: country._id
                }
            });

            $('#townSuccess').append('<h3>Town was created successfully!</h3>');
        } else {
            $('#townSuccess').append('<h3>Country does not exist!</h3>');
        }

        setTimeout(function () {
            $('#townSuccess').empty();
        }, 5000);

        $('#townCountryName').val('');
        $('#townName').val('')
    }

    async function appendCountries(countries) {
        let $countries = $('#countries');
        for (let country of countries) {
            let $div = $('<div>').attr('country-id', country._id);
            $div.append(`<label>Country</label>`);
            $div.append(`<input type="text" id="countryUpdateName" value="${country.name}"/>`);

            let $updateBtn = $('<button>').attr('id', 'updateCountryBtn').text('Update Country');
            $updateBtn.on('click', async function () {
                updateContry(country._id);
            });
            $div.append($updateBtn);

            let $deleteBtn = $('<button>').attr('id', 'deleteCountryBtn').text('Delete Country');
            $deleteBtn.on('click', async function () {
                deleteCountry(country._id);
            });
            $div.append($deleteBtn);

            try {
                let townsInDb = await $.ajax({
                    method: 'GET',
                    url: townUrl,
                    headers: header
                });
                let towns = townsInDb.filter(t => t.country === country._id);
                for (let town of towns) {
                    let $divTown = $('<div>')
                    $divTown.append(`<label>Town</label>`);
                    $divTown.append(`<input type="text" id="townName" value="${town.name}" disabled/>`);
                    $div.append($divTown);
                }
            } catch (error) {
                console.log(error);
            }

            $countries.append($div);
        }
    }

    async function updateContry(countryId) {
        await $.ajax({
            method: 'PUT',
            url: `${countryUrl}/${countryId}`,
            headers: header,
            data: {
                name: $('#countryUpdateName').val()
            }
        });

        $('#countries div').empty();
        showCountries();
    }

    async function deleteCountry(countryId) { 
        await $.ajax({
            method: 'DELETE',
            url: `${countryUrl}/${countryId}`,
            headers: header,
        });

        $('#countries div').empty();
        showCountries();
    }
}
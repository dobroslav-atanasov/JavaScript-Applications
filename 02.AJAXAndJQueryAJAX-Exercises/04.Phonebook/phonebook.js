function attachEvents() {
    const url = `https://phonebook-3f291.firebaseio.com/.json`;

    $('#btnCreate').on('click', function () {
        let $person = $('#person');
        let $phone = $('#phone');

       if ($person.val() && $phone.val()) {
            $.ajax({
                method: 'POST',
                url: url,
                data: JSON.stringify({
                    person: $person.val(),
                    phone: $phone.val()
                }),
                success: load()
            });
        }

        $person.val('');
        $phone.val('');
    });

    $('#btnLoad').on('click', function () {
        load();
    });

    function load() {
        $.ajax({
            method: 'GET',
            url: url,
            success: onLoadSuccess
        });
    }

    function onLoadSuccess(data) {
        let $ul = $('#phonebook');
        $ul.empty();

        Object.keys(data).forEach(id => {
            let $li = $('<li>').text(`${data[id].person}: ${data[id].phone}`);
            let $delButton = $('<button>').attr('id', 'btnDelete').text('Delete').on('click', function () {
                $.ajax({
                    method: 'DELETE',
                    url: `https://phonebook-3f291.firebaseio.com/${id}.json`,
                    success: () => load()
                });
            });
            $li.append($delButton);
            $ul.append($li);
        });
    }
}
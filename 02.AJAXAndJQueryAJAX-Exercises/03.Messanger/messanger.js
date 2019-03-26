function attachEvents() {
    let $submit = $('#submit');
    let $refresh = $('#refresh');
    const url = `https://messanger-f15b6.firebaseio.com/.json`;

    $submit.on('click', function () {
        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify({
                author: $('#author').val(),
                content: $('#content').val(),
                timespan: Date.now()
            })
        });

        refresh();
        $('#author').val('');
        $('#content').val('');
    });

    $refresh.on('click', function () {
        refresh();
    });
}

function refresh() {
    const url = `https://messanger-f15b6.firebaseio.com/.json`;

    $.ajax({
        method: 'GET',
        url: url,
        success: onRefreshSuccess
    });
}

function onRefreshSuccess(data) {
    let messages = Object.keys(data).map(id => `${data[id].author}: ${data[id].content}`);
    $('#messages').text(messages.join('\n'));
}
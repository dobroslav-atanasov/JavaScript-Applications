/// <reference path="../typings/globals/jquery/index.d.ts" />

function getInfo() {
    let stopId = $('#stopId').val();

    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    $.ajax({
        method: 'GET',
        url: url,
        success: getBusStop,
        error: getError
    });
}

function getBusStop(data) {
    $('#buses').empty();
    $('#stopName').text(data.name);

    let $ul = $('#buses');
    for (let bus of Object.keys(data.buses)) {
        let text = `Bus ${bus} arrives in ${data.buses[bus]} minutes`;
        let $li = $('<li>').text(text);
        $ul.append($li);
    }
    console.log(data)
}

function getError(){
    $('#stopName').text(`Error`);
}
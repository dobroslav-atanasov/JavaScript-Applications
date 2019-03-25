function solve() {
    return {
        depart: getDepart,
        arrive: getArrive
    };
}

let busStop = {
    name: 'depot',
    next: 'depot'
};

function getDepart() {
    const url = `https://judgetests.firebaseio.com/schedule/${busStop.next}.json`;
    $.ajax({
        method: 'GET',
        url: url,
        success: onSuccess
    });

    changeButtons();
}

function getArrive() {
    $('#info span').text(`Arriving at ${busStop.name}`);
    changeButtons();
}

function onSuccess(data) {
    busStop.name = data.name;
    busStop.next = data.next;
    $('#info span').text(`Next stop ${busStop.name}`);
}

function changeButtons() {
    let $depart = $('#depart');
    let $arrive = $('#arrive');

    if ($depart.is(':disabled')) {
        $depart.prop('disabled', false);
        $arrive.prop('disabled', true);
    } else {
        $depart.prop('disabled', true);
        $arrive.prop('disabled', false);
    }
}

let result = solve();
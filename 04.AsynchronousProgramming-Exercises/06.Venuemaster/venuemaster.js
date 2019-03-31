function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/';
    const username = 'guest';
    const password = 'pass';
    const token = btoa(`${username}:${password}`);
    const header = { "Authorization": `Basic ${token}` };

    $('#getVenues').on('click', getVenues);

    async function getVenues() {
        let $venueDate = $('#venueDate');

        let ids = await $.ajax({
            method: 'POST',
            url: `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${$venueDate.val()}`,
            headers: header
        });

        for (let id of ids) {
            let venue = await $.ajax({
                method: 'GET',
                url: `${url}venues/${id}`,
                headers: header
            });

            appendHtml(venue);
        }
    }

    function appendHtml(venue) {
        let $venue = $(`
            <div class="venue" id="${venue._id}">
                <span class="venue-name">
                    <input class="info" type="button" value="More info">${venue.name}
                </span>
                <div class="venue-details" style="display: none;">
                <table>
                  <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
                  <tr>
                    <td class="venue-price">${venue.price} lv</td>
                    <td><select class="quantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select></td>
                    <td><input class="purchase" type="button" value="Purchase"></td>
                  </tr>
                </table>
                <span class="head">Venue description:</span>
                <p class="description">${venue.description}</p>
                <p class="description">Starting time: ${venue.startingHour}</p>
                </div>
            </div>`);

        $venue.find('.info').on('click', function () {
            let $div = $venue.find('.venue-details');
            $div.css('display', 'block');
        });

        $venue.find('.purchase').on('click', function () {
            getPurchase(venue._id, venue.name, venue.price, $venue.find('.quantity option:selected').val());
        });

        $('#venue-info').append($venue);
    }

    function getPurchase(venueId, name, price, qty) {
        $('#venue-info').empty();
        let $purchase = $(`<span class="head">Confirm purchase</span>
        <div class="purchase-info">
          <span>${name}</span>
          <span>${qty} x ${price}</span>
          <span>Total: ${qty * price} lv</span>
          <input type="button" value="Confirm">
        </div>`);

        $purchase.find('input').on('click', function () {
            confirm(venueId, qty);
        });

        $('#venue-info').append($purchase);
    }

    async function confirm(venueId, qty) {
        $('#venue-info').empty();

        let data = await $.ajax({
            method: 'POST',
            url: `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venueId}&qty=${qty}`,
            headers: header
        });

        $('#venue-info').text('You may print this page as your ticket');
        $('#venue-info').append(data.html);
    }
}
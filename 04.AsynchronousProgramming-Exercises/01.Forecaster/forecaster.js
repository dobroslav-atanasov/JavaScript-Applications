function attachEvents() {
    const url = `https://judgetests.firebaseio.com/locations.json`;
    const urlToday = `https://judgetests.firebaseio.com/forecast/today/`;
    const urlUpcoming = `https://judgetests.firebaseio.com/forecast/upcoming/`;
    const weatherCodes = {
        Sunny: '☀',
        Partlysunny: '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    };

    $('#submit').on('click', onSubmit);

    async function onSubmit() {
        try {
            let towns = await $.ajax({
                method: 'GET',
                url: url,
            });

            let $location = $('#location');
            let town = towns.filter(x => x.name === $location.val())[0];
            if (town) {
                let townTodayWeather = await $.ajax({
                    method: 'GET',
                    url: `${urlToday}${town.code}.json`
                });

                let townUpcomingWeather = await $.ajax({
                    method: 'GET',
                    url: `${urlUpcoming}${town.code}.json`
                });

                weatherDisplay(town, townTodayWeather, townUpcomingWeather);
            } else {
                $location.val('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function weatherDisplay(town, townTodayWeather, townUpcomingWeather) {
        $('#forecast').css('display', 'block');

        console.log(townTodayWeather)
        console.log(townUpcomingWeather)
        let $current = $('#current');
        let $symbol = $('<span>').addClass('condition symbol').text(`${weatherCodes[townTodayWeather.forecast.condition.split(' ').join('')]}`);
        $current.append($symbol);

        let $span = $('<span>').addClass('condition');
        $current.append($span);

        let $name = $('<span>').addClass('forecast-data').text(townTodayWeather.name);
        $span.append($name);

        let $temp = $('<span>').addClass('forecast-data').text(`${townTodayWeather.forecast.low}${weatherCodes.Degrees}/${townTodayWeather.forecast.high}${weatherCodes.Degrees}`);
        $span.append($temp);

        let $cond = $('<span>').addClass('forecast-data').text(`${townTodayWeather.forecast.condition}`);
        $span.append($cond);
        
        let $upcoming = $('#upcoming');
        for (let item of townUpcomingWeather.forecast) {
            let $spanUp = $('<span>').addClass('upcoming');
            let $icon = $('<span>').addClass('symbol').text(`${weatherCodes[item.condition.split(' ').join('')]}`)
            let $degrees = $('<span>').addClass('forecast-data').text(`${item.low}${weatherCodes.Degrees}/${item.high}${weatherCodes.Degrees}`);
            let $con = $('<span>').addClass('forecast-data').text(`${item.condition}`);
            
            $spanUp.append($icon);
            $spanUp.append($degrees);
            $spanUp.append($con);
            $upcoming.append($spanUp);
        }
    }
}
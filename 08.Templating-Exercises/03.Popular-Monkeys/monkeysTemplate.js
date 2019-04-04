$(() => {
    render();

    function render() {
        const source = $('#monkey-template').html();
        const template = Handlebars.compile(source);
        const html = template({ monkeys });

        $('.monkeys').html(html);

        $('button').on('click', function(e){
            let $button = $(e.target);
            let $p = $button.next();
            if ($p.attr('style')) {
                $p.removeAttr('style');
                $button.text('Hide info');
            } else {
                $p.css('display', 'none');
                $button.text('Info');
            }
        })
    }
});
$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const source = $('#cat-template').html();
        const template = Handlebars.compile(source);

        const html = template({ cats });
        $('#allCats').html(html);

        $("button").on("click", function(e){
            let $button = $(e.target);
            let $div = $button.next();
            if ($div.attr('style')) {
                $button.text('Hide status Code');
                $div.removeAttr('style');
            } else {
                $button.text('Show status code');
                $div.attr('style', 'display: none')
            }
        });
    }
});

function showDetails(id) {
    $(`#${id}`).toggle();
}

$(() => {
    render();

    async function render() {
        const source = await $.get('./profile.hbs');
        const template = Handlebars.compile(source);
        const html = template({ contacts });

        $('.contacts').html(html);
    }
});
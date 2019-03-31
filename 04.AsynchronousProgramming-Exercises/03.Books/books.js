function attachEvents() {
    const url = `https://baas.kinvey.com/appdata/kid_BkIuR7pOV/books`;
    const username = 'Dobri';
    const password = 'dobri';
    const token = btoa(`${username}:${password}`);
    const header = { "Authorization": "Basic " + token };

    $('#createBtn').on('click', createBook);
    $('#loadBtn').on('click', loadBooks);

    async function createBook() {
        await $.ajax({
            method: 'POST',
            url: url,
            headers: header,
            data: {
                title: $('#title').val(),
                author: $('#author').val(),
                isbn: $('#isbn').val()
            }
        });

        $('#title').val('');
        $('#author').val('');
        $('#isbn').val('');

        $('#books div').empty();
        loadBooks();
    }

    async function loadBooks() {
        let books = await $.ajax({
            method: 'GET',
            url: url,
            headers: header
        });

        Array.from(books).forEach(book => {
            displayBook(book);
        });
    }

    function displayBook(book) {
        let $books = $('#books');

        let $div = $('<div>').attr('book-id', book._id);
        $div.append('<label>Title </label>');
        $div.append(`<input type="text" id="title" value="${book.title}" />`);
        $div.append('<label>Author </label>');
        $div.append(`<input type="text" id="author" value="${book.author}" />`);
        $div.append('<label>ISBN </label>');
        $div.append(`<input type="text" id="isbn" value="${book.isbn}" />`);

        let $updateBtn = $('<button>Update</button>')
        $updateBtn.on('click', async function (e) {
            let $parent = e.target.parentElement;
            await $.ajax({
                method: 'PUT',
                url: `${url}/${book._id}`,
                headers: header,
                data: {
                    title: $parent.querySelector('#title').value,
                    author: $parent.querySelector('#author').value,
                    isbn: $parent.querySelector('#isbn').value,
                }
            });

            $('#books div').empty();
            loadBooks();
        });
        $div.append($updateBtn);

        let $deleteBtn = $('<button>Delete </button>');
        $deleteBtn.on('click', async function(){
            await $.ajax({
                method: 'DELETE',
                url: `${url}/${book._id}`,
                headers: header,
            });

            $('#books div').empty();
            loadBooks();
        });
        $div.append($deleteBtn);

        $books.append($div);
    }
}
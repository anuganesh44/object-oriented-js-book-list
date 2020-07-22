//* Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//* UI Constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    //* Create tr Element
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button style= " border-style: none; font-size: 15px; margin-top: 15px;" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

UI.prototype.showAlert = function (message, className) {
    //* Create div
    const div = document.createElement('div');

    //* Add classes
    div.className = `alert ${className}`;

    //* Add Text
    div.appendChild(document.createTextNode(message));

    //* Get parent element
    const container = document.querySelector('.container');

    //* Get form
    const form = document.querySelector('#book-form');

    //* insert alert
    container.insertBefore(div, form);

    //* Set timeout for alert
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}
//* Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//* Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//* Store Constructor (for local storage)
function Store() {
    this.getBooks = function () {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            //* JSON.parse converts books into  JS object
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    this.displayBooks = function () {
        const books = this.getBooks;
        books.forEach(function (book) {
            //* Instantiate UI
            const ui = new UI();

            ui.addBookToList(book);
        })
    }

    this.addBook = function (book) {
        const books = this.getBooks;
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    this.removeBook = function (isbn) {
        const books = this.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}

//* Event Listener for displaying books on the UI from the  Local Storage

//* Instantiate Store
const store = new Store();

document.addEventListener('DOMContentLoaded', store.displayBooks);


//* Event Listener for Adding Book
document.getElementById('book-form').addEventListener('submit', function (e) {

    //* Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;


    //* Instantiate book
    const book = new Book(title, author, isbn);

    console.log(book);


    //* Instantiate UI
    const ui = new UI();

    //* Instantiate Store
    const store = new Store();

    //* Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //* Add Book to List
        ui.addBookToList(book);

        //* Add book to local storage
        store.addBook(book);



        //* show success alert after the book is added.
        ui.showAlert('Book Added Successfully', 'success');

        //* Clear fields after submit
        ui.clearFields();
    }

    e.preventDefault();
});

//* Event Listener for deleting book
document.getElementById('book-list').addEventListener('click', function (e) {

    //* Instantiate UI
    const ui = new UI();

    //* Delete Book
    ui.deleteBook(e.target);

    //* Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
})







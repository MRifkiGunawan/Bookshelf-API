const {addBooksHandler, getAllBooksHandler, getBooksHandler,editBooksHandler, deleteBooks} = require('./handler');
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler:getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler:getBooksHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler:editBooksHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooks,
    }
];

module.exports = routes;
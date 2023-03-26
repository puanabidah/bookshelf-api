const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler');

const routes = [
  // method untuk menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // method untuk menampilkan seluruh buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // method untuk menampilkan buku dengan id yang dicari
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
];

module.exports = routes;

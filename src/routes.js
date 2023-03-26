const { addBookHandler, getAllBooksHandler } = require('./handler');

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
];

module.exports = routes;

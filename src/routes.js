const { addBookHandler } = require('./handler');

const routes = [
  // method menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
];

module.exports = routes;

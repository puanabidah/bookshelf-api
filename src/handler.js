const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // yg ada di body request
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    insertedAt,
    updatedAt,
    finished,
  };

  // masukkan nilai-nilai tersebut ke dalam array books menggunakan method push()
  books.push(newBook);

  // menentukan apakah newBook sudah masuk ke dalam array Books? dengan menggunakan method filter
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Bila buku gagal dimasukkan
  // Client tidak melampirkan properti name pada request body
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Bila buku berhasil dimasukkan
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // jika gagal maka tdk masuk ke kondisi if, dan berlanjut kebawah ini
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  // request dari query
  const { finished } = request.query;
  // mapping a callback fucntion untuk return objek
  // berupa id, name, publisher dari array books
  const dataOfBook = (book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  });

  // jika terdapat buku yang sudah selesai
  if (finished) {
    const check = (book) => (Number(book.finished) === finished);
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter(check).map(dataOfBook),
      },
    });
    response.code(200);
    return response;
  }

  // jika belum terdapat buku, maka array books kosong
  if (books.length === 0) {
    const response = h.response({
      status: 'success',
      data: {
        books: [],
      },
    });
    response.code(200);
    return response;
  }

  // jika terdapat objek di array books maka tampilkan berikut
  const response = h.response({
    status: 'success',
    data: {
      books: books.map(dataOfBook),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  // filter array books dengan id yang cocok dari client
  const book = books.filter((n) => n.id === id)[0];

  // jika elemen book tidak kosong maka
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler };

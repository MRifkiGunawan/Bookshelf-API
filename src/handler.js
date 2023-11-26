const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;
    const id = nanoid(16);
    let finished = '';
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }   
    if (typeof reading !== 'boolean'){ //reading harus boolean
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Properti reading harus berupa nilai boolean',
        }).code(400);    
    }
     // Validasi properti pageCount dan readPage (harus number)
     if (typeof pageCount !== 'number' || typeof readPage !== 'number') {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Properti pageCount dan readPage harus berupa nilai number',
        }).code(400);
    }
    if (readPage > pageCount) { //valiadasi halaman baca tidak boleh lebih besar dari pagecount
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    if(pageCount === readPage){
        finished = true;
    }
    else{
        finished = false;
    }
    const newBooks = {
        id, 
        name, 
        year, 
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished , 
        insertedAt, 
        updatedAt,
      }; 
      books.push(newBooks);
      const isSuccess = books.filter((book) => book.id === id).length > 0;
if(isSuccess){
      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
      }).code(201);      
};
}
const getAllBooksHandler = (request, h) => {
    const{name, reading, finished} = request.query;
    if(!name && !reading && !finished) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id, name: book.name, publisher: book.publisher,
                })),
            },
        });
        return response.code(200);
    }
    if(name) {
        const filteredBooksName = books.filter((book) => {
            const nameRegex = new RegExp(name, "gi");
            return nameRegex.test(book.name);
        });
        const response = h.response({
            status: 'success',
            data: {
                books: filteredBooksName.map((book) => ({
                    id: book.id, name: book.name, publisher: book.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    if(reading) {
        const filteredBooksReading = books.filter((book) => Number(book.reading) === Number(reading),);
        const response = h.response({
            status: 'success',
            data: {
                books: filteredBooksReading.map((book) => ({
                    id: book.id, name: book.name, publisher: book.publisher,
                })),
            },
        });
        return response.code(200);
    }

    const filteredBooksFinished = books.filter((book) => Number(book.finished) === Number(finished),);

    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooksFinished.map((book) => ({
                id: book.id, name: book.name, publisher: book.publisher,
            })),
        },
    });
    return response.code(200);
};
const getBooksHandler = (request, h) =>{
    const { id } = request.params;
    const book = books.filter((n)=> n.id === id)[0];
    if(book !== undefined ){
        return{
            status: 'success',
            data: {
                book,
            },
        };
    }else {
        return h.response ({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);

    } };
const editBooksHandler = (request,h) =>{
const {id} = request.params;
const {name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;
const updatedAt = new Date().toISOString();
if (!name) {
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
}
if (typeof reading !== 'boolean'){ //reading harus boolean
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Properti reading harus berupa nilai boolean',
    }).code(400);    
}
 // Validasi properti pageCount dan readPage (harus number)
 if (typeof pageCount !== 'number' || typeof readPage !== 'number') {
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Properti pageCount dan readPage harus berupa nilai number',
    }).code(400);
}
if (readPage > pageCount) { //valiadasi halaman baca tidak boleh lebih besar dari pagecount
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
}
const index = books.findIndex((book)=> book.id == id);
if( index !== -1){
    books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
    };
    const response = h.response({
        status:'success',
        message: 'Buku berhasil diperbarui'
    });
    return response.code(200);
} else{
    const response = h.response({
        status:'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    return response.code(404);   
}
}
const deleteBooks = (request, h) =>{
    const { id } = request.params;
    const index = books.findIndex((book)=> book.id == id);
    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
        return response.code(200);
    } else{
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }); return response.code(404);
    }
}
module.exports = {addBooksHandler, getAllBooksHandler,getBooksHandler, editBooksHandler, deleteBooks};
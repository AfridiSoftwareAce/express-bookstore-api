const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../app'); // Import the server, not the app.
const Book = require('../models/Book');
const connectDB = require('../configs/mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Book Management API', function() {

  before(async function() {
    this.db = await connectDB();
  });

  after(async function() {
    await Book.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  describe('GET /books', function() {
    it('should retrieve all books', async function() {
      const res = await chai.request(server).get('/books');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /books', function() {
    it('should create a new book', async function() {
      const newBook = {
        title: 'Book Test Title',
        author: 'Book Test Author',
        genre: 'Book Test Genre',
        description: 'Book Test Description',
      };

      const res = await chai.request(server).post('/books').send(newBook);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'Book created successfully');

      expect(res.body.book).to.have.property('_id');
      expect(res.body.book).to.have.property('title', newBook.title);
      expect(res.body.book).to.have.property('author', newBook.author);
      expect(res.body.book).to.have.property('genre', newBook.genre);
      expect(res.body.book).to.have.property('description', newBook.description);
    });
  });
});

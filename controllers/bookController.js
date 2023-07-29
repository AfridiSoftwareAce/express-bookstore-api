const Book = require('../models/Book');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error getting all books:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      console.error('Error getting book by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createBook: async (req, res) => {
    try {
      const { title, author, genre, description } = req.body;
      const newBook = new Book({ title, author, genre, description });
      await newBook.save();
      res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      console.error('Error creating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const { title, author, genre, description } = req.body;

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      book.title = title;
      book.author = author;
      book.genre = genre;
      book.description = description;
      await book.save();

      res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      await book.remove();
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = bookController;

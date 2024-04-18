// routes/api.js

const express = require('express');
const router = express.Router();
const Book = require('./book_model'); // Assuming you've defined the Book model
const app = express();
const connectDB= require("./db");

connectDB();
app.use(express.json());
// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// POST a new book
router.post('/books', async (req, res) => {
  try {
    const { title, author, genre,price } = req.body;
    const newBook = new Book({ title, author, genre,price });
    // console.log(newBook);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book', error });
  }
});

// PUT (update) an existing book by ID
router.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre,price } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre,price }, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
});

// DELETE a book by ID
router.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
});

app.use('/api', router);

app.listen(5000, () => {
    console.log(`Todolist listening at http://localhost:3000`);
})
module.exports = router;

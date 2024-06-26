const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const Book = require('./Book.js');
const Invoice = require('./Invoice.js');
const mongo = require('./database.js')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// Set the correct view engine for rendering HTML files
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'addbook.html'));
});



// Add a book

router.post('/api/books', async (req, res) => {
    console.log(req.body, "req.body");
    try {
        const { title, author, price ,booktype } = req.body;
        const book = new Book({ title, author, price ,booktype });
        await book.save();
        console.log(book, "book");
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//Display book

router.post('/api/displayBooks', async (req, res) => {
    try {
        const book = await Book.find();
        console.log(book, "book");
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Remove a book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Purchase a book
router.post('/:id/purchase', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Create invoice
        const invoice = new Invoice({
            book: book._id,
            title: book.title,
            author: book.author,
            price: book.price
        });
        await invoice.save();

        // Remove book from collection
        await book.remove();

        res.status(201).json({ message: 'Book purchased', invoice });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongo()


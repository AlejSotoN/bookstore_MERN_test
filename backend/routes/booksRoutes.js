import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for Saving a new Book
router.post('/', async (req, res)=> {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = new Book({ title, author, publishYear });
        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
});

// Route for Fetching all Books from database
router.get('/', async (req, res)=> {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route for Fetching one Book from database by id
router.get('/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route for Updating a Book by id
router.put('/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const result = await Book
        .findByIdAndUpdate(id, { title, author, publishYear }, { new: true });

        if (!result) {
            return res.status(404).send({
                message: 'Book not found',
            });
        } 
        return res.status(200).send({message: 'Book updated successfully', data: result});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

// Route for Deleting a Book by id
router.delete('/:id', async (req, res)=> {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: 'Book not found',
            });
        }
        return res.status(200).send({message: 'Book deleted successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

export default router;

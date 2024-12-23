import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import bookRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

// Middleware for accepting JSON data in the body of the request
app.use(express.json());

// Middleware for enabling CORS
// Option 1: Allow All Origins
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// })
// );

app.get('/', (req, res)=> {
    console.log(req, res);
    return res.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', bookRoutes);

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('MongoDB connected');
        
        app.listen(PORT, ()=> {
            console.log(`App is listening to port:${PORT}`);
        });
    })
    .then((error)=> {
        console.log(error);
    });
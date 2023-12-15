import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
import { Book } from "./models/bookModels.js";
import bookRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY

//OPTION 1: Allow all origins with default of cors
// app.use(cors());
//option 2: allow custom origins
app.use(
    cors({
        origin:'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);




app.get('/', (req,res) =>{
    console.log(req)
    return res.status(222).send('welcome');
});

app.use('/books', bookRoute);


mongoose
 .connect(mongoDBURL)
 .then(()=> {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`)
    });

 })
 .catch((error) => {
    console.log(error);

 });
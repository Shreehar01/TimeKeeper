// Importing required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importing different routes
import entryRoutes from './routes/entries.js';

// Setting up the express object
const app = express();
dotenv.config();
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/entry', entryRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to TimeKeeper!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(()=> app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
 .catch((error)=> console.log(error.message));
mongoose.set('useFindAndModify', false);


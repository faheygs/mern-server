import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type"]
    }
});

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB Connected!'))
.catch(err => console.log('DB Connection err: ', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json');
});
app.use(cors());

readdirSync('./routes').map(r => app.use('/api', require(`./routes/${r}`)));

io.on('connect', (socket) => {
    socket.on('new-post', (newPost) => {
        socket.broadcast.emit('new-post', newPost);
    });

    socket.on('new-message', (newMessage) => {
        socket.broadcast.emit('new-message', newMessage);
    });
});

const port = process.env.PORT || 8000;

http.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
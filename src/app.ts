import 'reflect-metadata';
import express from 'express';
import {createConnection} from 'typeorm';
import SocketIO from 'socket.io'
import {createServer} from 'http';

import {apiRouter} from './router/apiRouter';
import {config} from './config';
// import {cronRun} from "./crone";

const app = express();
const server = createServer(app);
// @ts-ignore
const io = SocketIO(server, {cors: {origin: '*'}});

io.on('connection', (socket: any) => {
 console.log('_____________________________________________')
 console.log(socket.id);
 console.log(socket.data);
 console.log('_____________________________________________')
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(apiRouter);
// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const {PORT} = config;

server.listen(PORT, async () => {
    console.log('server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connected!!!!');
        }
        // cronRun();
    } catch (e) {
        if (e) console.log(e);
    }
});

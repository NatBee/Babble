const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const db = require('knex')(config);

app.use('/', express.static('build'));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (message) => {
        console.log('message: ' + message.message);
        console.log('timestamp: ' + message.timeStamp);
        console.log('user: ' + message.fromUserId);
        io.sockets.emit('message', message);

        const msg = {
            message: message.message,
            timeStamp: message.timeStamp,
            fromUserId: message.fromUserId
        }

        db('message').insert(msg)
            .then(() => console.log('Message saved'))
            .catch((e) => console.log(e));
    })

    socket.on('disconnect', () => console.log('disconnected'));
})

app.get('/message', (req, res) => {
    return db('message')
        .orderBy('timeStamp', 'desc')
        .limit(10)
        .then((message) => res.status(200).json({ message: message.reverse()}))
        .catch((e) => res.status(500).json({ error: 'Error fetching messages'}));
})

app.post('/newUser', (req, res) => {
    const userInfo = req.body;
    return db('user')
        .insert({
            name: userInfo.name,
            password: userInfo.password,
            loggedIn: userInfo.loggedIn
        })
        .then((user) => res.status(200).json({ user: user }))
        .catch((e) => res.status(500).json({ error: 'Error saving user info'}));
})

app.get('/users', (req, res) => {
    return db('user')
        .orderBy('id', 'asc')
        .then((users) => res.status(200).json({ users: users }))
        .catch((e) => res.status(500).json({ error: 'Error fetching users'}));
})

http.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
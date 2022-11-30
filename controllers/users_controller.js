const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (request, response) => {
    User.find({}, (error, UserList) => {
        response.render('./users/new.ejs', {currentUser: request.session.currentUser, userNames: UserList})
    })
});

users.post('/newUser', (request, response) => {
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
    User.create(request.body, (err, createdUser) => {
        console.log('user is created', createdUser)
        response.redirect('/sessions/new')
    })
});

users.get('/UserList', (request, response) => {
    User.find({}, {username: 1}, (error, UserList) => {
        response.send(UserList)
    })
});

module.exports = users;
const bcrypt = require('bcrypt');
const { response } = require('express');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (request, response) => {
    response.render('./sessions/new.ejs', {currentUser: request.session.currentUser})
});

sessions.post('/userLogin', (request, response) => {
    console.log(User.findOne)
    User.findOne({username: request.body.username}, (err, foundUser) => {
        console.log(foundUser)
        if(err) {
            console.log(err)
            response.send('oops the db had a problem')
        } else if(!foundUser) {
            response.send('<a href="/">Sorry, no user found </a>')
        } else {
            if (bcrypt.compareSync(request.body.password, foundUser.password)) {
                request.session.currentUser = foundUser
                response.redirect('/gundam')
            } else {
                response.send('<a href="/"> password does not match </a>')
            }
        }
    })
});

sessions.delete('/', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/')
    })
});

module.exports = sessions;
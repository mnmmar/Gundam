const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');

let PORT = 3000;
if(process.env.PORT) {
    PORT = process.env.PORT
}

const Seed = require('./models/seed.js');
const Gundam = require('./models/schema.js');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());


//post
app.post('/gundam', (request, response) => {
    Gundam.create(request.body, (error, Gundam) => {
        response.redirect('/gundam')
    });
});

//new
app.get('/gundam/new', (request, response) => {
    response.render('new.ejs')
});

//seed
app.get('/gundam/seed', (request, response) => {
    Gundam.create(Seed, (error, data) => {
        response.redirect('/gundam')
    });
});

//index
app.get('/', (request, response) => {
    Gundam.find({}, (error, Gundam) => {
        response.render('index.ejs', {gundam: Gundam});
    });
});

//show
app.get('/gundam/:id', (request, response) => {
    Gundam.findById(request.params.id, (error, Gundam) => {
        response.render('show.ejs', {gundam: Gundam})
    });
});

//edit
app.get('/gundam/:id/edit', (request, response) => {
    Gundam.findById(request.params.id, (error, foundGundam) => {
        response.render('edit.ejs', {gundam: foundGundam})
    });
});

//update
app.put('/gundam/:id', (request, response) => {
    Gundam.findByIdAndUpdate(request.params.id, request.body, {new: true}, (error, updatedGundam) => {
        response.render('show.ejs', {gundam: updatedGundam})
    });
});

//delete
app.delete('/gundam/:id', (request, response) => {
    Gundam.findByIdAndRemove(request.params.id, (error, data) => {
        response.redirect('/gundam')
    });
});

app.listen(PORT, () => {
    console.log('site is up and running');
});

// mongoose.connect('mongodb://localhost:27017/gundam', () => {
//     console.log('The connection with mongod is established');
// });

mongoose.connect('mongodb+srv://mnmmar:<7zly82xr>@sei.n8kqkha.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo');
});

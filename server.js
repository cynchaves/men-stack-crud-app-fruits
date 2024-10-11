const dotenv = require('dotenv'); // require package
dotenv.config(); // Loads the environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

  //------------------Middleware--------------------------
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

const Fruit = require('./models/fruit.js');
const fruitsCtrl = require("./controllers/fruits");

app.get('/', fruitsCtrl.home);

app.get('/fruits', fruitsCtrl.index);

app.get('/fruits/new', fruitsCtrl.addNewForm);

app.post('/fruits', fruitsCtrl.create);

app.get('/fruits/:fruitID', fruitsCtrl.show);

app.delete('/fruits/:fruitId', fruitsCtrl.deleteOne);

app.get('/fruits/:fruitId/edit', fruitsCtrl.editForm);

app.put('/fruits/:fruitId', fruitsCtrl.update);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

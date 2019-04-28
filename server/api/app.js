const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookmarkRoute = express.Router();
const Schema = mongoose.Schema;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/bookmark', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB connection OK!");
})


const Bookmark = new Schema({
  linkName:  String,
  linkHref: String
});

const Card = mongoose.model("Card", Bookmark);

//----------- Bookmark Routes ---------------------

bookmarkRoute.route('/').get( (req, res) => {
  Card.find((err, cards) => {
    if(err) {console.log(err);}
    else {res.json(cards);}
  });
});

bookmarkRoute.route('/:id').get((req, res) => {
    const id = req.params.id;
    Card.findById(id, (err, cards) => {
        res.json(cards);
    });
  });
  
bookmarkRoute.route('/add').post((req, res) => {
    let bookm = new Card(req.body);
    bookm.save()
        .then(item => {
            res.json({"item": 'bookm added successfully'});
        })
        .catch(err => {
            res.send('adding new bookm failed');
        });
  });

  
bookmarkRoute.route('/delete/:id').delete((req, res) => {
  const ID = req.params.id;
  Card.findByIdAndDelete(ID, (err, results) => {
    res.json({ success: ID })
  });
});

app.use('/bookmark', bookmarkRoute);

//----------- Bookmark Routes ---------------------


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
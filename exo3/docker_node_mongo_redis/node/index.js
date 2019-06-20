import * as access from './access.js';

const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const mongoUrl = `mongodb://${process.env.MONGODB_ADDR}:${
  process.env.MONGODB_PORT
  }/textmonkey`;
const bodyParser = require('body-parser');

const redisClient = require('redis').createClient;
const redis = redisClient(process.env.REDIS_PORT, process.env.REDIS_ADDR);
let db;

const postBook = (req, res) => {
  if (!req.body.title || !req.body.author) {
    res.status(400).send('Please send a title and an author for the book');
    return;
  }
  if (!req.body.text) {
    res.status(400).send('Please send some text for the book');
    return;
  }

  access.saveBook(db, req.body.title, req.body.author, req.body.text, err => {
    if (err) {
      res.status(500).send('Server error');
      return;
    }
    res.status(201).send('Saved');
  });
};

const getBookByTitle = (req, res) => {
  if (!req.param('title')) {
    res.status(400).send('Please send a proper title');
    return;
  }

  access.findBookByTitleCached(db, redis, req.param('title'), book => {
    if (!text) {
      res.status(500).send('Server error');
      return;
    }

    res.status(200).send(book);
  });
};

const updateBookByTitle = (req, res) => {
  if (!req.param('title')) {
    res.status(400).send('Please send the book title');
    return;
  }

  if (!req.param('text')) {
    res.status(400).send('Please send the new text');
    return;
  }
  access.updateBookByTitle(
    db,
    redis,
    req.param('title'),
    req.param('text'),
    err => {
      if (err === 'Missing book') {
        res.status(404).send('Book not found');
        return;
      }
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      res.status(200).send('Updated');
    }
  );
};

const start = (err, databaseInstance) => {
  if (err) {
    throw 'Error connecting to database - ' + err;
  }
  db = databaseInstance;

  app.use(express.static('public'));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.render('index');
  });
  app.post('/book', postBook);

  app.get('/book', (req, res) => {
    access.findBooks(db, (err, doc) => {
      if (err) {
        res.status(500).send('Server error');
        return;
      }
      res.status(200).send(doc);
    });
  });
  app.get('/book/:title', getBookByTitle);

  app.put('/book/:title', updateBookByTitle);

  app.listen(8080, function () {
    console.log('Listening on port 8080');
  });
};

MongoClient.connect(mongoUrl, start);

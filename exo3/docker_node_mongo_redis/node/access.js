export const saveBook = (db, title, author, text, callback) => {
  db
    .collection('text')
    .insertOne({title: title, author: author, text: text}, callback);
};

export const findBookByTitle = (db, title, callback) => {
  db.collection('text').findOne({title: title}, (err, doc) => {
    if (err || !doc) {
      callback(null);
      return;
    }
    callback(doc.text);
  });
};

export const findBookByTitleCached = (db, redis, title, callback) => {
  redis.get(title, (err, reply) => {
    if (err) {
      callback(null);
      return;
    }
    if (reply) {
      //Book exists in cache
      callback(JSON.parse(reply));
      return;
    }

    //Book doesn't exist in cache - we need to query the main database
    db.collection('text').findOne({title: title}, (err, doc) => {
      if (err || !doc) {
        callback(null);
        return;
      }
      //Book found in database, save to cache and return to client
      redis.set(title, JSON.stringify(doc), callback);
    });
  });
};

export const findBooks = (db, callback) => {
  db.collection('text').find().toArray((err, doc) => {
    if (err || !doc) {
      console.log('Error', err);
      callback(null);
      return;
    }
    callback(null, doc);
  });
};

export const updateBookByTitle = function (
  db,
  redis,
  title,
  _newText,
  callback
) {
  db
    .collection('text')
    .findOneAndUpdate(
      {title: title},
      {$set: {text: text}},
      (err, doc) => {
        //Update the main database
        if (err) {
          callback(err);
          return;
        }
        if (!doc) {
          callback('Missing book');
          return;
        }
        //Save new book version to cache
        redis.set(title, JSON.stringify(doc), err => callback(err || null));
      }
    );
};

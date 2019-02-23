const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb+srv://robot:lDFx3pwVBLG9Raym@cluster0-jj9fk.mongodb.net/test?retryWrites=true'
    )
    .then(client=>{
        _db = client.db();
        callback();
    })
    .catch(err=>{
        throw err
    })
}

const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
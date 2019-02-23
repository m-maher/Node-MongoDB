const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(num, name, mail,id) {
    this.num = num;
    this.name = name;
    this.mail = mail;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('data')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('data').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('data')
      .find()
      .toArray()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('data')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('data')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;

const Data = require('../models/data');

exports.getAddData = (req, res, next) => {
  res.render('admin', {
    pageTitle: 'Add Product',
    path: '/admin',
    editing: false
  });
};

exports.postAddData = (req, res, next) => {
  console.log('hi')
  const num = req.body.num;
  const name = req.body.name;
  const mail = req.body.mail;
  const data = new Data(
    num,
    name,
    mail
  );
  data
    .save()
    .then(() => {
      res.redirect('/admin');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditData = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/admin');
  }
  const prodId = req.params.productId;
  Data.findById(prodId)

    .then(data => {
      if (!data) {
        return res.redirect('/admin');
      }
      res.render('admin', {
        pageTitle: 'Edit Product',
        path: '/admin',
        editing: editMode,
        product: data
      });
    })
    .catch(err => console.log(err));
};

exports.postEditData = (req, res, next) => {
  const prodId = req.body.productId;
  const num = req.body.num;
  const name = req.body.name;
  const mail = req.body.mail;
  const data = new Data(
    num,
    name,
    mail,
    prodId
  );
  data
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin');
    })
    .catch(err => console.log(err));
};

exports.getData = (req, res, next) => {
  Data.fetchAll()
    .then(data => {
      res.render('admin', {
        prods: data,
        pageTitle: 'Admin Data',
        path: '/admin'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteData = (req, res, next) => {
  const prodId = req.body.productId;
  Data.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED DATA');
      res.redirect('/admin');
    })
    .catch(err => console.log(err));
};

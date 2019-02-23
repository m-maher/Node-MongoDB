const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const adminRoute = require('./routes/admin');

const adminController = require('./contoller/admin');

app.use(adminRoute);

app.use(adminController.getData);

mongoConnect(() => {
    app.listen(9000);
});
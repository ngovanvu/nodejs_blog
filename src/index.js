const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
// connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')));

// middle ware  sử dụng cho get
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// middle ware sử dụng cho post
app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
           sum: (a,b) => a + b, // cộng index ở mycourses
        }
    }),
);
                app.set('view engine', 'hbs');
// app.set('views', './src/resources/views')
app.set('views', path.join(__dirname, 'resources','views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

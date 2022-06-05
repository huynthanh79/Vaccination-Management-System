const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routers');


app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//HTTP logger
//app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: {
            // Function to do basic mathematical operation in handlebar
            math: function (lvalue, operator, rvalue) {
                lvalue = parseFloat(lvalue);
                rvalue = parseFloat(rvalue);
                return {
                    '+': lvalue + rvalue,
                    '-': lvalue - rvalue,
                    '*': lvalue * rvalue,
                    '/': lvalue / rvalue,
                    '%': lvalue % rvalue,
                }[operator];
            },
            //sum: (a, b) => a + b,

            convert: (str) => {
                var date = new Date(str),
                  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                  day = ("0" + date.getDate()).slice(-2);
                return [day, mnth, date.getFullYear()].join("-");
              }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

// app.get('/', async function (req, res) {
//     const pool = await conn;
//     const query = "select * from ACCOUNT";
//     await pool.request()
//     .query(query)
//     .then(result => {
//         res.json(result.recordset)
//     });
// });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const { execArgv } = require('process');
const app = express();
const port = 8780;

const SortMiddleware = require('./app/middleware/SortMiddleware')
const routes = require('./routes/index.js');
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field == sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    desc: 'oi oi-sort-descending',
                    asc: 'oi oi-sort-ascending',
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`
            }
        },
    }),
);

//Template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'recources', 'views'));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware)

// app.get('/middleware', 
//     function(req, res1, next1){
//         if(['vethuong', 'vevip'].includes(req.query.ve)){
//             return next1();
//         }
//         res1.status(403).json({
//             message: "Access denined"
//         })
//     },
//     function(req, res, next){
//         res.json({ message: 'Succesfully' })
//     }
// )

//Routes init
routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

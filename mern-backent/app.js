const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config');

app.use(cors)
app.options('*', cors())

//Routes
const categoryRouter = require('./routers/categories');
const productRouter = require('./routers/products');
const userRouter = require('./routers/users');
const orderRouter = require('./routers/orders');

const api = process.env.APP_URL

// Middleware
app.use(express.json());
// app.use(bodyParser.json()) with app.use(express.json())
app.use(morgan('tiny'))

app.use(`${api}/categories`, categoryRouter)
app.use(`${api}/products`, productRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/orders`, orderRouter)


mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nour-shop'
}).then(() => {
    console.log('Database connection successful ....');
}).catch((err) => {
    console.log(err.message);
})

app.listen(3000, () => {
    console.log(api)
    console.log('The server is working now on port http://localhost:3000');
});
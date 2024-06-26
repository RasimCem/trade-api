const express = require('express');
const verifyAccessToken = require('./middlewares/auth');

const app = express();
require('dotenv').config();
const authRouter = require('./routes/auth');
const portfolioRouter = require('./routes/portfolio');
const shareRouter = require('./routes/share');


//const verifyAccessToken = require('./middlewares/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    require('dotenv').config();
    console.log(`App listening on port ${PORT}`)
});

//Authentication
app.use('/api/v1', authRouter);

//JWT Verification
app.use(verifyAccessToken);

// Portfolio
app.use('/api/v1/portfolios', portfolioRouter);

// Share
app.use('/api/v1/shares', shareRouter);

// app.get('/api/v1/', (req, res) => {
//     res.send('hello world')
// })

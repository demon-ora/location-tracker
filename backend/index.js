const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')



app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');

app.use(express.json());

app.use(cors({ credentials: true, origin: '*' }));


const PORT = process.env.PORT || 3000;

app.use(require('./router/auth'));

// parse JSON bodies
app.use(express.json());


app.listen(PORT);
const express = require('express');
const bodyParser = require('body-parser');

var port = process.env.PORT || 5000;

const app = express();


const port = 5000;

const todoRouter = require('./routes/todo_route');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', todoRouter);

app.listen(port, () => {
    console.log("up and running on port: ", port);
});
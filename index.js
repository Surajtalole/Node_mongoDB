require('./models/student.model');

const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const studentController = require("./controllers/studentController");

var app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to student Database!</h2>
        <h3> Click here to get access to the <b><a href="/student/list">Database</a></b></h3>`
    );
});

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs',
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: 'mainLayout',
        layoutsDir: __dirname + '/views/layouts/'
    })
);

app.set("view engine", 'hbs');

app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});

app.use("/student", studentController);

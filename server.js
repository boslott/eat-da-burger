
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

//  Create an express server
const app = express();

//  Set the port to listen on
const PORT = process.env.PORT || 3000;

//  Middleware
//    - Sets the express app to handle parsing
//    - Handles static-file requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//  Set Handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//  Import routes and give the server access to them
const routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

app.listen(PORT, () => {
  console.log('App listening on PORT: ' + PORT);
});

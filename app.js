// require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes')

// Set up middleware to parse request body
app.use(bodyParser.json());

routes(app)

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

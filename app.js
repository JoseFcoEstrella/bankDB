const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client, Loan } = require('./data/model');
// require('dotenv').config();

// Set up middleware to parse request body
app.use(bodyParser.json());

// Define routes for clients
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      res.status(404).json({ error: 'Client not found' });
    } else {
      res.json(client);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/clients', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Define Loans Route

app.get('/loans', async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/loans/:id', async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      res.status(404).json({ error: 'Loans not found' });
    } else {
      res.json(loan);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/loans', async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})

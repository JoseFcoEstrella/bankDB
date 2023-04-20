var express = require('express');
var router = express.Router();
const { Client } = require('../db/model');

// GET all client
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get client by id
router.get('/clients/:id', async (req, res) => {
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

// Update cliente by id
router.put('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).send({ message: 'Client not found' });
    }

    client.first_name = req.body.first_name || client.first_name;
    client.last_name = req.body.last_name || client.last_name;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.address = req.body.address || client.address;
    client.city = req.body.city || client.city;
    client.state = req.body.state || client.state;
    client.zip_code = req.body.zip_code || client.zip_code;

    const updatedClient = await client.save();
    res.send(updatedClient);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// create a client
router.post('/clients', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete client by id
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).send();
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

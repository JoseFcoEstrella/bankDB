var express = require('express');
var router = express.Router();

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

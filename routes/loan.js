var express = require("express");
var router = express.Router();
const { Loan } = require('../db/model');

// Get all loans
router.get("/loans", async (req, res) => {
  try {
    const loans = await Loan.findAll();
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by id
router.get("/loans/:id", async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      res.status(404).json({ error: "Loans not found" });
    } else {
      res.json(loan);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE Loans
router.post("/loans", async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE loans
router.delete('/:id', async (req, res) => {
    try {
      const loan = await Loan.findByIdAndDelete(req.params.id);
      if (!loan) {
        return res.status(404).send();
      }
      res.send(loan);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;

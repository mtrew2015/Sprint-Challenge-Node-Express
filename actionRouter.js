const express = require('express');
const router = express.Router();
const db = require('./data/helpers/actionModel');

router.get('/', (req, res) => {
  db.get()
    .then(actions => {
      res.json(actions);
    })
    .then(err => { res.status(500).json({ erorr: "Error retrieving your resource" }) })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(action => {
      res.json(action);
    })
    .catch(err => { res.status(500).json({ error: `Error retrieving your action with the id of ${id} ` }) })
})

router.post('/', (req, res) => {
  const action = req.body;
  if (action.project_id && action.description.length < 128 && action.description && action.notes) {
    db.insert(action)
      .then(((action) => {
        res.status(201).json(action)
      }))
      .catch(err => res.status(500).json({ error: "error posting your action" }))
  } else if (action.description.length > 128) {
    res.status(400).json({ error: "action description is too long" })
  } else {
    res.status(400).json({ error: "action name and action description required" })
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      res.json({ message: `succesfully deleted ${count} records` })
    })
});

router.put('/:id', (req, res) => {
  const action = req.body;
  const {id} = req.params
  if (action.project_id && action.description.length < 128 && action.description && action.notes) {
    db.update(id, action)
      .then(((action) => {
        res.status(200).json(action)
      }))
      .catch(err => res.status(500).json({ error: "error editing your action" }))
  } else if (action.description.length > 128) {
    res.status(400).json({ error: "action description is too long" })
  } else {
    res.status(400).json({ error: "action name and action description required" })
  }
});



module.exports = router;
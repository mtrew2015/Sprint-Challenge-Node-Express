const express = require('express');
const router = express.Router();
const db = require('./data/helpers/projectModel');

//returns all projects without actions
router.get('/', (req, res) => {
  db.get()
    .then(project => {
      res.json(project);
    })
    .then(err => { res.status(500).json({ erorr: "Error retrieving your resource" }) })
});

//returns all projects
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get(id)
    .then(project => {
      res.json(project);
    })
    .catch(err => { res.status(500).json({ error: `Error retrieving your project with the id of ${id} ` }) })
})

//edit

//retrieves actions for projects with given ID
router.get('/:id/actions', (req, res) => {
  const { id } = req.params;
  db.getProjectActions(id)
    .then(actions => {
      res.json(actions);
    })
    .catch(err => { res.status(500).json({ error: `Error retrieving your project with the id of ${id} ` }) })
});

//creates new project
router.post('/', (req, res) => {
  const project = req.body;
  if (project.name && project.name.length < 180 && project.description) {
    db.insert(project)
      .then(((project) => {
        res.status(201).json(project)
      }))
      .catch(err => res.status(500).json({ error: "error posting your project" }))
  } else if (project.name.length > 180) {
    res.status(400).json({ error: "project description is too long" })
  } else {
    res.status(400).json({ error: "project name and project description required" })
  }

});
//deletes project with ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
      res.json({ message: `succesfully deleted ${count} records` })
    })
});
//edits project
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;
  if (project.name && project.name.length < 180 && project.description) {
    db.update(id, project)
      .then(project => {
        res.json(project)
      })
      .catch(err => res.status(500).json({ error: "error editing your project" }))
  } else if (project.name.length > 180) {
    res.status(400).json({ error: "project description is too long" })
  } else {
    res.status(400).json({ erorr: "project name and project description required" })
  }
})


module.exports = router;


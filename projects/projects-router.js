const router = require('express').Router();
const Projects = require('./projects-model.js');

router.post('/projects', (req, res) => {

  Projects
    .addProject(req.body)
    .then(project => {
      res.status(201).json({project})
    })
    .catch(err => {
      res.status(500).json({err})
    })
})

router.post('/actions', (req, res) => {

  Projects
    .addAction(req.body)
    .then(action => {
      res.status(201).json({action})
    })
    .catch(err => {
      res.status(500).json({err})
    })
})

router.get('/projects/:id', (req, res) => {

  Projects
    .getProject(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
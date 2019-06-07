const router = require('express').Router();
const Projects = require('./projects-model.js');

router.post('/projects', (req, res) => {

  Projects
    .addProject(req.body)
    .then(project => {
      res.status(201).json({project});
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.post('/actions', (req, res) => {

  Projects
    .addAction(req.body)
    .then(action => {
      res.status(201).json({action});
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.get('/projects/:id', (req, res) => {

  Projects
    .getProject(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  Projects.removeProject(id)
    .then( project => {
      res.status(204).json({ project })
    })
    .catch( err => {
       res.status(500).json({ message: 'error' });
    })
});

router.delete('/actions/:id', (req, res) => {
  const { id } = req.params;

  Projects.removeAction(id)
    .then( project => {
      res.status(204).json({ project })
    })
    .catch( err => {
       res.status(500).json({ message: 'error' });
    })
});

router.get('/projects', (req, res) => {

  Projects
    .getProjects()
    .then(projects => {
      res.status(200).json({projects});
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.get('/actions', (req, res) => {

  Projects
    .getActions()
    .then(actions => {
      res.status(200).json({actions});
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.get('/actions/:id', (req, res) => {

  Projects
    .getAction(req.params.id)
    .then(action => {
      res.status(200).json({action});
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

module.exports = router;
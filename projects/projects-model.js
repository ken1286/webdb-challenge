const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  addProject,
  addAction,
  getProject
};

async function getProject(id) {
  const project = await db('projects')
    .where({ id })
    .first();

  const projectActions = await db('projects')
    .join('actions', 'actions.project_id', 'projects.id')
    .select('actions.id', 'actions.description', 'actions.notes', 'actions.completed')
    .where({'actions.project_id': id});

  const actions = await projectActions.map(action => action);
  const result = {
                  ...project,
                  actions
                };
  return result;
};

function addProject(project) {
  return db('projects')
    .insert(project);
};

function addAction(action) {
  return db('actions')
    .insert(action);
};
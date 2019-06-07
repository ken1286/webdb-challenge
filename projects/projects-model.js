const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
  addProject,
  addAction,
  getProject,
  removeProject,
  removeAction,
  getProjects,
  getActions,
  getAction
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

function removeProject(id) {
  return db('projects')
    .where('id', id)
    .del();
};

function removeAction(id) {
  return db('actions')
    .where('id', id)
    .del();
};

function getProjects() {
  return db('projects');
};

function getActions() {
  return db('actions')
  .join('projects', 'projects.id', 'actions.project_id')
  .select('actions.*', 'projects.name as projectName')
};

function getAction(id) {
  return db('actions')
  .where('id', id)
  .first()
};
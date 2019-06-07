
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('projects', (tbl) => {
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    
    tbl
      .string('description')
      .notNullable();
    
    tbl
      .boolean('completed')
      .defaultTo('false');
  });

  await knex.schema.createTable('actions', (tbl) => {
    tbl.increments();

    tbl
      .string('description')
      .notNullable()
      .unique();
    
    tbl
      .string('notes');
    
    tbl
      .boolean('completed')
      .defaultTo('false');

    tbl
      .integer('project_id')
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects')
};


exports.up = function(knex) {
  return Promise.all([
      knex.schema.createTable('user', (table) => {
          table.increments('id').primary();
          table.string('name');
          table.string('password');
          table.boolean('loggedIn')
      }),

      knex.schema.createTable('message', (table) => {
          table.increments('id').primary();
          table.string('message');
          table.dateTime('timeStamp');
          table.string('fromUserId');
      }),

      knex('user')
          .insert({
              name: 'Morticia',
              password: 'XOGomez',
              loggedIn: true
          })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
      knex.schema.dropTable('user'),
      knex.schema.dropTable('message'),
  ]);
};

exports.up = function(knex) {
  return knex.schema.createTable('book_copy', (table) => {
    table.string('book_id', 12).notNullable();
    table.string('copy_num', 12).notNullable();
    table.string('state', 25);

    table.primary(['book_id', 'copy_num']);

    table
      .foreign('book_id')
      .references('book.book_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('book_copy');
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('book_category', (table) => {
    table.string('book_id', 12).notNullable();
    table.string('cat_id', 12).notNullable();

    table.primary(['book_id', 'cat_id']);

    table
      .foreign('book_id')
      .references('book.book_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('cat_id')
      .references('category.cat_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('book_category');
};

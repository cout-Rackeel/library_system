/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('book', (table) => {
    table.string('book_id', 12).primary().notNullable();
    table.string('book_nm', 150);
    table.string('publisher', 150);
    table.string('author', 150);
  });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('book');
};

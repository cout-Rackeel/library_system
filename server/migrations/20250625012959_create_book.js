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
    table.boolean('is_trending').defaultTo(false); // Example: a boolean column with a default value
    table.string('img_url'); 
  });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('book');
};

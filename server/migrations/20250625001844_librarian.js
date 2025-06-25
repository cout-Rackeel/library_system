/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('librarian', (table) => {
    table.string('id_num', 12).primary().notNullable();

    table
      .foreign('id_num')
      .references('user.user_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('librarian');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.string('user_id', 12).primary().notNullable();
    table.string('f_name', 50);
    table.string('l_name', 100);
    table.string('email', 100);
    table.string('password', 255);
    table.date('dt_joined');
    table.string('user_type', 25);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};


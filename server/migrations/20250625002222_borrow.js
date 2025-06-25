/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('borrow', (table) => {
    table.string('member_id', 12).notNullable();
    table.string('book_id', 12).notNullable();
    table.string('copy_num', 12).notNullable();
    table.date('borrow_dt').notNullable();
    table.date('set_return_dt');
    table.date('act_return_dt');
    table.string('librarian_id', 12);

    table.primary(['member_id', 'book_id', 'copy_num', 'borrow_dt']);

    table
      .foreign(['book_id', 'copy_num'])
      .references(['book_id', 'copy_num'])
      .inTable('book_copy')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('member_id')
      .references('member.member_id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('librarian_id')
      .references('librarian.id_num')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('borrow');
};

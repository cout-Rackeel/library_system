/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('loan', (table) => {
    table.string('book_id', 12).notNullable();
    table.string('copy_num', 12).notNullable();
    table.string('loan_num', 12).notNullable();
    table.date('loan_dt').notNullable();
    table.date('set_return_dt');
    table.date('act_return_dt');
    table.specificType('late_fee', 'money');
    table.specificType('amount_retained', 'money');
    table.specificType('amount_returned', 'money');
    table.string('loan_distributor', 100);
    table.string('borrower_esign', 100);
    table.string('returner_esign', 100);
    table.string('return_authorizer', 12);

    table.primary(['book_id', 'copy_num', 'loan_num', 'loan_dt']);

    table
      .foreign(['book_id', 'copy_num'])
      .references(['book_id', 'copy_num'])
      .inTable('book_copy')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('loan_distributor')
      .references('librarian.id_num')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('return_authorizer')
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
  return knex.schema.dropTableIfExists('loan');
};

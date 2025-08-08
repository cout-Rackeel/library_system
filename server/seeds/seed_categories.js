/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()

  // const {generateRandomNumber} = require('../utils/common');

  const categories = [
  { cat_id: "bkcat_000000", cat_nm: "romance" },
  { cat_id: "bkcat_000001", cat_nm: "fiction" },
  { cat_id: "bkcat_000002", cat_nm: "fantasy" },
  { cat_id: "bkcat_000003", cat_nm: "adventure" },
  { cat_id: "bkcat_000004", cat_nm: "mystery" },
  { cat_id: "bkcat_000005", cat_nm: "comedy" },
  { cat_id: "bkcat_000006", cat_nm: "poetry" },
  { cat_id: "bkcat_000007", cat_nm: "crime" },
  { cat_id: "bkcat_326038", cat_nm: "historical" }
];


  await knex('category').insert(categories);
};

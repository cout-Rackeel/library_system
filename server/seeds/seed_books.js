/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('book_category').del()
  await knex('book_copy').del()
  await knex('book').del()

  const books = [
  {
    book_id: '180-848-5855',
    book_nm: 'A Chorus of Swords',
    publisher: 'Voyager Books',
    author: 'John Hundley',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/1754598353641_book_cover_4.jpg',
    is_trending: true
  },
  {
    book_id: '227-152-5761',
    book_nm: 'Breaking the Ice',
    publisher: 'Katherine Brashear',
    author: 'Katherine Brashear',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/1754596789799_book_cover_6.jpg',
    is_trending: true
  },
  {
    book_id: '233-791-1492',
    book_nm: 'The Age of Storms',
    publisher: 'Lenkk Press',
    author: 'Rocco Levitas',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/175459624152_book_cover_7.jpg',
    is_trending: true,
  },
  {
    book_id: '652-950-8238',
    book_nm: 'Really Good, Actually',
    publisher: 'HarperCollins Publishers',
    author: 'Monica Heisey',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/1754598078067_book_cover_2.jpg',
    is_trending: true
  },
  {
    book_id: '968-433-6158',
    book_nm: 'The Silverblood Promise',
    publisher: 'Tor Publishing Group',
    author: 'James Logan',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/1754598454225_book_cover_5.jpg',
    is_trending: true
  },
  {
    book_id: '990-593-6107',
    book_nm: 'Beyond the Ocean Door',
    publisher: 'Amisha Sathi',
    author: 'Amisha Sathi',
    img_url: 'https://pub-cc17d62202984fc0b2c18257d0f7988b.r2.dev/uploads/1754597194522_book_cover.jpg',
    is_trending: true
  }
];

 const bookCategoriesBody = [
  { book_id: "180-848-5855", cat_id: "bkcat_000002" },
  { book_id: "227-152-5761", cat_id: "bkcat_000001" },
  { book_id: "227-152-5761", cat_id: "bkcat_000002" },
  { book_id: "233-791-1492", cat_id: "bkcat_000002" },
  { book_id: "233-791-1492", cat_id: "bkcat_000003" },
  { book_id: "652-950-8238", cat_id: "bkcat_000001" },
  { book_id: "968-433-6158", cat_id: "bkcat_000002" },
  { book_id: "968-433-6158", cat_id: "bkcat_000004" },
  { book_id: "990-593-6107", cat_id: "bkcat_000002" }
];

const bookCopiesBody =  [
  { book_id: "180-848-5855", copy_num: "CY-5855-1253", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-1550", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-1825", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-2897", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-4558", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-5075", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-5929", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-6800", state: "Available" },
  { book_id: "180-848-5855", copy_num: "CY-5855-7778", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-1812", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-1850", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-1938", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-2053", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-2939", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-3140", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-3405", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-4427", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-5639", state: "Available" },
  { book_id: "227-152-5761", copy_num: "CY-5761-6369", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-2201", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-2219", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-2650", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-3450", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-4003", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-7211", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-8008", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-9172", state: "Available" },
  { book_id: "233-791-1492", copy_num: "CY-1492-9847", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-2237", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-2847", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-3044", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-3739", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-5835", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-5974", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-6302", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-7876", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-8217", state: "Available" },
  { book_id: "652-950-8238", copy_num: "CY-8238-9353", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-1813", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-2046", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-5444", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-5489", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-6340", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-6390", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-6749", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-8113", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-9023", state: "Available" },
  { book_id: "968-433-6158", copy_num: "CY-6158-9083", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-1860", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-2102", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-3295", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-3427", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-5472", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-6129", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-6931", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-7614", state: "Available" },
  { book_id: "990-593-6107", copy_num: "CY-6107-8304", state: "Available" }
];


const insertedBooks = await knex('book').insert(books).returning(['book_id']);
const insertedBookCategories = await knex('book_category').insert(bookCategoriesBody).returning(['book_id' , 'cat_id']);
const insertedBookCopies = await knex('book_copy').insert(bookCopiesBody).returning(['book_id' , 'copy_num']);



 
  

 


};

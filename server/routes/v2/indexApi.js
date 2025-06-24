const { log } = require('console');
const express = require('express');
const router = express.Router();

const userRouter = require('../v2/userRouter');
const authRouter = require('../v2/authRouter');
const memberRouter = require('../v2/memberRouter');
const librarianRouter = require('../v2/librarianRouter');
const bookRouter = require('../v2/bookRouter');
const bookCopyRouter = require('../v2/bookCopyRouter');
const borrowRouter = require('../v2/borrowRouter')



router.use('/user' , userRouter);
router.use('/auth' , authRouter);
router.use('/member' , memberRouter);
router.use('/librarian' , librarianRouter);
router.use('/book', bookRouter);
router.use('/bookcopy', bookCopyRouter);
router.use('/borrow', borrowRouter);

module.exports = router;
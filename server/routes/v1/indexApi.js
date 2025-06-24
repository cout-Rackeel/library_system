const { log } = require('console');
const express = require('express');
const router = express.Router();

const userRouter = require('../../routes/v1/userRouter');
const authRouter = require('../../routes/v1/authRouter');
const memberRouter = require('../../routes/v1/memberRouter');
const librarianRouter = require('../../routes/v1/librarianRouter');
const bookRouter = require('../../routes/v1/bookRouter');
const bookCopyRouter = require('../../routes/v1/bookCopyRouter');
const borrowRouter = require('../../routes/v1/borrowRouter')



router.use('/user' , userRouter);
router.use('/auth' , authRouter);
router.use('/member' , memberRouter);
router.use('/librarian' , librarianRouter);
router.use('/book', bookRouter);
router.use('/bookcopy', bookCopyRouter);
router.use('/borrow', borrowRouter);

module.exports = router;
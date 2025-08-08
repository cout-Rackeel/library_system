const { getAllCopies, getAllCopiesBy, addCopy, editCopy } = require('../../services/v2/bookCopyService');

exports.getAllCopies = async (req, res, next) => {
  try {
    let copies;
    if (Object.keys(req.query).length === 0) {
      copies = await getAllCopies();
    } else {
      copies = await getAllCopiesBy(req.query);
    }

    res.status(200).json({
      status: 200,
      message: "Retrieved copies successfully",
      body: copies
    });
  } catch (err) {
    next(err);
  }
};

exports.addCopy = async (req, res, next) => {
  try {
    const copy = await addCopy(req.params.id, req.body);

    res.status(201).json({
      status: 201,
      message: "Book copy successfully added",
      body: copy
    });
  } catch (err) {
    next(err);
  }
};

exports.editCopy = async (req, res, next) => {
  try {
    const updatedCopy = await editCopy(req.params.id, req.params.copy_num, req.body);

    res.status(200).json({
      status: 200,
      message: "Book copy successfully updated",
      body: updatedCopy
    });
  } catch (err) {
    next(err);
  }
};

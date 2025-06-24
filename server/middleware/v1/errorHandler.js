

exports.errorHandler = (err, req, res, next) => {

  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    status: "Error",
    message: err.message || "Internal Server Error",
    ...(err.details !== undefined && {details : err.details}),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
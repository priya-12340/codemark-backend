const sendError = (res, error, statusCode = 500) => {
  console.error(error);

  if (process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({ message: "Something went wrong" });
  }

  return res.status(statusCode).json({ message: error.message });
};

module.exports = sendError;
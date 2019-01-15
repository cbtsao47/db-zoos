module.exports = (req, res, next) => {
  if (!req.body.name.length) {
    res.status(400).json({ message: "Please include a name!" });
  }
  next();
};

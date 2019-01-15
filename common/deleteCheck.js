const db = require("../data/dbConfig");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const item = await db("bears").where({ id });
  if (item.length) {
    next();
  } else {
    res.status(404).json({ message: "Data Not Found" });
  }
};

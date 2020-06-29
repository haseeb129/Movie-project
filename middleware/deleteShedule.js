const Schedual = require("../modals/Schedule");
module.exports = (req, res, next) => {
  Schedual.findOne({ date: req.body.date })
    .exec()
    .then((record) => {
      if (record) {
        Schedual.remove({ _id: record._id }).exec().then(next());
      } else next();
    });
};

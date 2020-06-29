const jwt = require("jsonwebtoken");
async function JWTcreate(data) {
  const token = jwt.sign(
    {
      _id: data._id,
      FirstName: data.FirstName,
      Email: data.Email,
      admin: data.admin,
      Picture: data.Picture,
    },
    "secret",
    { expiresIn: "5h" }
  );
  return token;
}
module.exports.JWTcreate = JWTcreate;

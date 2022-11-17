
const admin = (req, res, next) => {
    const admin = true;
    if (!admin) throw new Error("Unauthorize", 401);
    next();
  };

module.exports = admin;
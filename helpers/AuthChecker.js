module.exports = (req, res, next) => {
  let auth_headers = req.headers.authorization;
  if (!auth_headers) {
    return res.status(401).json({ error: 'Token not found. Unauthorised!' });
  } else next();
};

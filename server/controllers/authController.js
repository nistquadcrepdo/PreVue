const jwt = require('jsonwebtoken');
require('dotenv').config();

const privateKey = process.env.SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
    console.log('inside authenticate')
  try {
    console.log('req cookies', req.cookies)
    const { ssid } = req.cookies;
    //decoded becomes {id,username}
    const decoded = jwt.verify(ssid, privateKey);
    console.log('decoded', decoded)
    res.locals.username = decoded.username;
    // res.append('Access-Control-Allow-Origin', ['localhost:5173'])
    // res.locals.userInfo = decoded;
    return next();
    // res.status(200).json(decoded);
  } catch (err) {
    return next(err);
  }
};

authController.sign = (req, res, next) => {
    console.log('res.locals', res.locals)
  try {
    const { username, id } = res.locals;
    const token = jwt.sign(
      {
        username,
        id
      },
      privateKey,
      { expiresIn: '1h' }
    );
    console.log(token)
    res.locals.token = token;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authController;

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var da = require('../dataaccess/index');

// Enabling CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.post('/authenticate', function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password,
  };

  if (user.username != "manish") {
    res.json({
      success: false,
      message: 'Authentication failed, User not Found.'
    });
  } else if (user.password != "manish") {
    res.json({
      success: false,
      message: 'Authentication failed, Wrong Password.'
    });
  } else {
    var token = jwt.sign(user, "checking", {
      expiresIn: 1440
    });

    res.json({
      success: true,
      message: 'Authentication Success.',
      token: token
    });
  }
});

function check(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'checking', function (err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: 'Invalid Token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.status(403).send({
      success: false,
      message: 'No Token Found.'
    });
  }
}

//router.get('/products', check, function (req, res, next) {
router.get('/products', function (req, res, next) {
  da.getAllProducts(function (data) {
    res.send(data);
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var employeeService = require('../dataaccess/employeeService');

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

    if (user.username != "admin") {
        res.json({
            success: false,
            message: 'Authentication failed, User not Found.'
        });
    } else if (user.password != "admin") {
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

//router.get('/employee', check, function (req, res, next) {
//getAllEmployee
router.get('/employee', function (req, res, next) {
    employeeService.getAllEmployee().then(function (data) {
        res.send(data);
        //res.render('users/index', { title: "Users View", users: data });
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//Create
router.post('/employee/create', function (req, res, next) {
    var name = req.body.emp.name;
    var designation = req.body.emp.designation;
    var disabled = req.body.emp.disabled;
    var pwd = req.body.emp.pwd;
    var emp = {
        "name": name,
        "designation": designation,
        "disabled": disabled,
        "pwd": pwd
    };
    employeeService.addEmployee(emp).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//getUserById
router.get('/employee/edit/:id', function (req, res, next) {
    let id = req.params.id;
    employeeService.getUserById(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

//Update Post
router.post('/employee/edit/:id', function (req, res, next) {
    let _id = req.params.id;
    var name = req.body.emp.name;
    var designation = req.body.emp.designation;
    var disabled = req.body.emp.disabled;
    var pwd = req.body.emp.pwd;
    var emp = {
        "name": name,
        "designation": designation,
        "disabled": disabled,
        "pwd": pwd
    };
    //console.log('Enter 55', emp);
    employeeService.updateEmployee(_id, emp).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//delete(Post)
router.get('/employee/delete/:id', function (req, res, next) {
    let id = req.params.id;
    employeeService.deleteEmployee(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});


module.exports = router;
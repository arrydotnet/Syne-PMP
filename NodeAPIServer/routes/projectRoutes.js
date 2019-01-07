var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var projectService = require('../dataaccess/projectService');

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

//router.get('/project', check, function (req, res, next) {
//getAllproject
router.get('/projects', function (req, res, next) {
    projectService.getAllproject().then(function (data) {
        res.send(data);
        //res.render('users/index', { title: "Users View", users: data });
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//Create
router.post('/projects/create', function (req, res, next) {
    var project_id = req.body.project.project_id;
    var project_name = req.body.project.project_name;
    var desc = req.body.project.desc;
    var completed = req.body.project.completed;
    var startdate = req.body.project.startdate;
    var enddate = req.body.project.enddate;
    var project = {
        "project_id": project_id, "project_name": project_name, "desc": desc,
        "completed": completed, "startdate": startdate, "enddate": enddate
    }

    projectService.addProject(project).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//getUserById
router.get('/projects/edit/:id', function (req, res, next) {
    let id = req.params.id;
    projectService.getProjectById(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

//Update Post
router.post('/projects/edit/:id', function (req, res, next) {
    let _id = req.params.id;
    var project_id = req.body.project.project_id;
    var project_name = req.body.project.project_name;
    var desc = req.body.project.desc;
    var completed = req.body.project.completed;
    var startdate = req.body.project.startdate;
    var enddate = req.body.project.enddate;
    var project = {
        "project_id": project_id, "project_name": project_name, "desc": desc,
        "completed": completed, "startdate": startdate, "enddate": enddate
    }
    projectService.updateProject(_id, project).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//delete(Post)
router.get('/projects/delete/:id', function (req, res, next) {
    let id = req.params.id;
    projectService.deleteProject(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

router.get('/projects/employee/:id', function (req, res, next) {
    let id = req.params.id;
    projectService.getProjectByEmployeeId(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

router.post('/projects/allocate/:id', function (req, res, next) {
    //console.log('CAlled--/projects/allocate/:id')
    let employeeID = req.params.id;
    var projects = req.body.projects;//array
    //var projectAlloc =   {"project_id":project_id, "employeeID" :employeeID  }
    projectService.SaveAllocatedProjectByEmployeeID(employeeID, projects).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

router.get('/projects/CounteAllocatedEmployee/', function (req, res, next) {
    projectService.CounteAllocatedEmployee().then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//USER STORY


//Create
router.post('/projects/story/create', function (req, res, next) {
    var storyID = req.body.userStory.storyID;
    var projectID = req.body.userStory.projectID;
    var story_title = req.body.userStory.story_title;
    var desc = req.body.userStory.desc;
    var completed = req.body.userStory.completed;
    var startdate = req.body.userStory.startdate;
    var enddate = req.body.userStory.enddate;
    var storyPoints = req.body.userStory.storyPoints;
    //{"storyID":1, "projectID":ObjectId("5c235591d4416dc4ddb1a7a5"), "story_title" : "story 1" ,
    //"desc": "story", "completed": false ,"startDate":'01/01/2017', "endDate":'01/01/2018' ,"storyPoints" :5 }

    var obj = {
        "storyID": storyID, "project_id": projectID, "story_title": story_title,
        "desc": desc, "completed": completed, "startdate": startdate, "enddate": enddate, "storyPoints": storyPoints
    }

    projectService.addUserStory(obj).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//getUserById
router.get('/projects/story/edit/:id', function (req, res, next) {
    let id = req.params.id;
    projectService.GetUserStoryById(id).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//api/projects/:pid/story
router.get('/projects/story/:pid', function (req, res, next) {
    console.log('enter:');

    let pid = req.params.pid;
    console.log('enter:', pid);

    projectService.GetUserStoryByProjectId(pid).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//  //api/projects/story/delete/:id
router.get('/projects/story/delete/:sid', function (req, res, next) {
    let sid = req.params.sid;
    projectService.deleteStoryByID(sid).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//task-----------------------------
//-----------------------------
//Create
router.post('/tasks/:pid/:sid/create', function (req, res, next) {
    var storyID = req.body.task.storyID;
    var projectID = req.body.task.projectID;
    var task_title = req.body.task.task_title;
    var desc = req.body.task.desc;
    var completed = req.body.task.completed;
    var startdate = req.body.task.startdate;
    var enddate = req.body.task.enddate;
    var assignedTo = req.body.task.assignedTo;

    var obj = {
        "project_id" : projectID,
        "storyID" : storyID,
        "task_title" : task_title,
        "desc" : desc,
        "completed" : completed,
        "startdate" : startdate,
        "enddate" : enddate,
        "assignedTo" : assignedTo
    }

    projectService.addTask(obj).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });

});
//GetAllTaskByStoryID: //api/tasks/:sid
router.get('/tasks/story/:sid', function (req, res, next) {
    let sid = req.params.sid;
    projectService.GetTaskBySID(sid).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//GetTaskById: api/tasks/:tid
router.get('/tasks/:tid', function (req, res, next) {
    let tid = req.params.tid;
    projectService.GetTaskById(tid).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});
//Delete: api/tasks/delete/:id
router.get('/tasks/delete/:tid', function (req, res, next) {
    let tid = req.params.tid;
    projectService.DeleteTaskByID(tid).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

//update api/tasks/:pid/:sid/update/:tid
router.post('/tasks/:pid/:sid/update/:tid', function (req, res, next) {
    let tid = req.params.tid;
    var storyID = req.body.task.storyID;
    var projectID = req.body.task.projectID;
    var task_title = req.body.task.task_title;
    var desc = req.body.task.desc;
    var completed = req.body.task.completed;
    var startdate = req.body.task.startdate;
    var enddate = req.body.task.enddate;
    var assignedTo = req.body.task.assignedTo;
    var obj = {
        "project_id" : projectID,
        "storyID" : storyID,
        "task_title" : task_title,
        "desc" : desc,
        "completed" : completed,
        "startdate" : startdate,
        "enddate" : enddate,
        "assignedTo" : assignedTo
    }
    projectService.UpdateTask(tid,obj).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});

//-------------------------------------

//Update Post
router.post('/projects/story/edit/:id', function (req, res, next) {
    let _id = req.params.id;
    //var projectID = req.body.userStory.projectID;
    var storyID = req.body.userStory.storyID;
    var story_title = req.body.userStory.story_title;
    var desc = req.body.userStory.desc;
    var completed = req.body.userStory.completed;
    var startdate = req.body.userStory.startdate;
    var enddate = req.body.userStory.enddate;
    var storyPoints = req.body.userStory.storyPoints;
    // var obj = {
    //     "storyID": storyID, "project_id": projectID, "story_title": story_title,
    //     "desc": desc, "completed": completed, "startdate": startdate, "enddate": enddate, "storyPoints": storyPoints
    // }
    var obj = {
        "storyID": storyID, "story_title": story_title,
        "desc": desc, "completed": completed, "startdate": startdate, "enddate": enddate, "storyPoints": storyPoints
    }
    console.log('_id', _id)
    console.log('update', obj)
    projectService.updateUserStory(_id, obj).then(function (data) {
        res.send(data);
    }, function (eMsg) {
        console.log('err!:', eMsg);
    });
});


module.exports = router;
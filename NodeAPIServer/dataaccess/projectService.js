var fs = require('fs');
const monk = require('monk');
//const db = monk('localhost/dbPMP');
const db = monk('mongodb://user123:user123@ds157654.mlab.com:57654/dbpmp');
//mongodb://<dbuser>:<dbpassword>@ds157654.mlab.com:57654/dbpmp
//mongodb://user123:user123@ds157654.mlab.com:57654/dbpmp


const collection = db.get('project');
const collectionProjAllocation = db.get('projectAllocation');
const collectionProjectUserStories = db.get('projectUserStories');
const collectionUserStoryTasks = db.get('UserStoryTasks');
const collectionEmployee = db.get('employee');


module.exports.getAllproject = function () {
    return new Promise((resolve, reject) => {
        collection.find({}).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[getAllProject Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.getProjectById = function (id) {
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: monk.id(id) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[getProjectById Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.addProject = function (projectObj) {
    return new Promise((resolve, reject) => {
        collection.insert(projectObj).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[addProject Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.updateProject = function (id, projectObj) {
    return new Promise((resolve, reject) => {
        collection.findOneAndUpdate({ _id: monk.id(id) }, { $set: projectObj }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[updateProject Error]!:', err);
            reject("Connection Error...");
        });
    });
}

module.exports.deleteProject = function (id) {
    return new Promise((resolve, reject) => {
        collection.findOneAndDelete({ _id: monk.id(id) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[deleteProject Error]!:', err);
            reject("Connection Error...");
        });
    });
}

module.exports.getProjectByEmployeeId = function (employeeID) {
    //db.getCollection('projectAllocation').find({ employeeID: ObjectId("5c2359a9d4416dc4ddb1a9bb") })
    return new Promise((resolve, reject) => {
        collectionProjAllocation.find({ employeeID: monk.id(employeeID) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[getProjectByEmployeeId Error]!:', err);
            reject("Connection Error...");
        });
    });
}





//--
module.exports.addUserStory = function (userStoryObj) {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.insert(userStoryObj).then(function (data) {
            //updte project table
            console.log('findOneAndUpdate:');
            collection.findOneAndUpdate(
                { _id: monk.id(userStoryObj.project_id) },
                { $set: { "hasUserStory": true } }
            ).then(function (data) {
                resolve(data);
            });
            resolve(data);
        }, function (err) {
            console.log('[addUserStory Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.updateUserStory = function (id, userStoryObj) {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.findOneAndUpdate({ _id: monk.id(id) }, { $set: userStoryObj }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[updateUserStory Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.GetUserStoryById = function (id) {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.findOne({ _id: monk.id(id) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[GetUserStoryById Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.GetUserStoryByProjectId = function (pid) {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.find({ project_id: pid }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[GetUserStoryByProjectId Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.deleteStoryByID = function (sid) {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.findOneAndDelete({ _id: monk.id(sid) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[deleteStoryByID Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.GetAllUserStory = function () {
    return new Promise((resolve, reject) => {
        collectionProjectUserStories.find({}).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[GetAllOpenFinishedStories Error]!:', err);
            reject("Connection Error...");
        });
    });
}
//--add task 
module.exports.addTask = function (obj) {
    return new Promise((resolve, reject) => {
        collectionUserStoryTasks.insert(obj).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[addTask Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.GetTaskById = function (tid) {
    return new Promise((resolve, reject) => {
        collectionUserStoryTasks.findOne({ _id: monk.id(tid) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[GetUserStoryById Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.GetTaskBySID = function (sid) {
    return new Promise((resolve, reject) => {
        //collectionUserStoryTasks.find({ storyID: monk.id(sid) }).then(function (data) {
        collectionUserStoryTasks.find({ storyID: sid }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[GetTaskBySId Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.DeleteTaskByID = function (tid) {
    return new Promise((resolve, reject) => {
        collectionUserStoryTasks.findOneAndDelete({ _id: monk.id(tid) }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[DeleteTaskByID Error]!:', err);
            reject("Connection Error...");
        });
    });
}
module.exports.UpdateTask = function (tid, obj) {
    console.log('tid::', tid);
    console.log('obj::', obj);


    return new Promise((resolve, reject) => {
        collectionUserStoryTasks.findOneAndUpdate({ _id: monk.id(tid) }, { $set: obj }).then(function (data) {
            resolve(data);
        }, function (err) {
            console.log('[UpdateTask Error]!:', err);
            reject("Connection Error...");
        });
    });
}
//--







module.exports.AllAllocatedEmployee = function () {
    var allocatedEmployee = 1;
    var totalEmployee = 0;
    var promise1 = new Promise((resolve, reject) => {
        collectionProjAllocation.distinct('employeeID').then((x) => {
            // allocatedEmployee= x.length;
            // console.log('collectionProjAllocation:',allocatedEmployee);
            resolve(x.length);
        }, function (err) {
            console.log('[UpdateTask Error]!:', err);
            reject("Connection Error...");
        });
    });
    var promise2 = new Promise((resolve, reject) => {
        collectionEmployee.distinct('_id').then((x) => {
            // allocatedEmployee= x.length;
            // console.log('collectionProjAllocation:',allocatedEmployee);
            resolve(x.length);
        }, function (err) {
            console.log('[UpdateTask Error]!:', err);
            reject("Connection Error...");
        });
    });
    return Promise.all([promise1, promise2]).then((value)=> {
        // console.log('ALL------>');
        // console.log('resultsA------>',value[0]);
        // console.log('resultsA------>',value[1]);
        var data ={ "AllAllocatedEmployee": value[0], "totalEmployees": value[1] };
        return data;
    }).catch(err => console.log(err));
}


module.exports.SaveAllocatedProjectByEmployeeID = function (employeeID, projects) {
    //db.getCollection('projectAllocation').find({ employeeID: ObjectId("5c2359a9d4416dc4ddb1a9bb") })
    return new Promise((resolve, reject) => {
        //add delete and save coding.
        console.log('--remove--')
        collectionProjAllocation.remove({ employeeID: monk.id(employeeID) }).then(function (data) {
            //after delete loop and  save
            var emp = monk.id(employeeID);
            for (var i = 0; i < projects.length; i++) {
                var empAlloc = {
                    "project_id": projects[i],
                    "employeeID": emp,
                };
                console.log('--add--', empAlloc);
                collectionProjAllocation.insert(empAlloc).then(function (data) {
                    resolve(data);
                });
            }
        }, function (err) {
            console.log('[SaveAllocatedProjectByEmployeeID Error]!:', err);
            reject("Connection Error...");
        });
    });
}






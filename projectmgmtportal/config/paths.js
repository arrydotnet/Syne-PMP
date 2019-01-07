const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolvePath = function(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

module.exports = {
    appRootPath: appDirectory, 
    appBuildPath: resolvePath('dist'),
    cssOutputPath: 'static/css/',
    jsOutputPath: 'static/js/'
}
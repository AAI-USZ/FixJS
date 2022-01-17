function (grunt) {
    grunt.initConfig({}); 

    var connect = require('connect');

    grunt.registerTask('server', 'Starts the static web server', function () {
        connect(connect.static('www-root')).listen(1337);
    });
}
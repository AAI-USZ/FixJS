function(grunt) {

    grunt.initConfig({
        img: {
            filter: {
                src: ['tests/img/*.png'],
                dest: 'tests/optimg'
            },
            directory: {
                src: 'tests/img',
                dest: 'tests/optimg'
            },
            replace: {
                src: ['tests/img/*.jpg']
            }
        },
        lint: {
            grunt: ['grunt.js', 'tasks/*.js']
        },
        watch: {
            files: '<config:lint.grunt>',
            tasks: 'lint:grunt'
        },
        jshint: {
            options: {
                es5: true,
                node: true,
                curly: false,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true
            }
        }
    });

    grunt.registerTask('default', 'lint');

    grunt.loadTasks('tasks');
}
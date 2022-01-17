function(grunt) {

    grunt.initConfig({
        img: {
            filter: {
                src: ['tests/img/*.png'],
                dest: 'tests/optimg'
            },
            dir: {
                src: 'tests/img',
                dest: 'tests/optimg'
            },
            jpg: {
                src: ['tests/img/*.jpg'],
                dest: 'tests/optimg'
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

    grunt.registerTask('default', 'lint img');

    grunt.loadTasks('tasks');
}
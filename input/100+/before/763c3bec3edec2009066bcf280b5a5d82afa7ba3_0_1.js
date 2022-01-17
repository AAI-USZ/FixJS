function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            name: 'Brix',
            banner: '/*! <%= meta.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' + '* <%= pkg.homepage %>\n' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        lint: {
            files: ['grunt.js']
        },
        concat: {
            brixjs: {
                src: ['<banner:meta.banner>', "src/core/mustache.js", "src/core/mu.js", "src/core/tmpler.js", "src/core/dataset.js", "src/core/chunk.js", "src/core/brick.js", "src/core/pagelet.js"],
                dest: 'dist/<%= pkg.name %>.js'
            },
            brixcss:{
                src:['<banner:meta.banner>','dist/brix.css'],
                dest: 'dist/brix.css'
            }
        },
        min: {
            brix: {
                src: ['<banner:meta.banner>', 'dist/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>-min.js'
            },
            dialog: {
                src: ['src/gallery/dialog/index.js'],
                dest: 'dist/gallery/dialog/index-min.js'
            },
            kwicks: {
                src: ['src/gallery/kwicks/index.js'],
                dest: 'dist/gallery/kwicks/index-min.js'
            },
            inplaceeditor: {
                src: ['src/gallery/inplaceeditor/index.js'],
                dest: 'dist/gallery/inplaceeditor/index-min.js'
            },
            dropdown: {
                src: ['src/gallery/dropdown/index.js'],
                dest: 'dist/gallery/dropdown/index-min.js'
            }
        },
        less: {
            brix: {
                src: ['src/style/brix.less'],
                dest: 'dist/brix.css'
            }
        },
        cssmin: {
            brix: {
                src: ['dist/brix.css'],
                dest: 'dist/brix-min.css'
            },
            dialog: {
                src: ['src/gallery/dialog/dialog.css'],
                dest: 'dist/gallery/dialog/dialog-min.css'
            },
            dropdown: {
                src: ['src/gallery/dropdown/dropdown.css'],
                dest: 'dist/gallery/dropdown/dropdown-min.css'
            }
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint:files test:files'
        },
        jshint: {
            options: {
                browser: true,
                curly: true,
                eqeqeq: false,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true
            },
            globals: {
                exports: true,
                module: false,
                KISSY: true,
                console: true,
                print: true,
                document: true,
                window: true
            }
        },
        uglify: {
            codegen: {
                ascii_only: true
            }
        }
    });
    
    //npm install grunt-less
    grunt.loadNpmTasks('grunt-less');
    //npm install grunt-css
    grunt.loadNpmTasks('grunt-css');
    // Default task.
    grunt.registerTask('default', 'lint less concat min cssmin');
}
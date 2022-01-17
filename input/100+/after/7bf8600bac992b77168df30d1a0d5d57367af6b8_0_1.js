function(grunt) { 'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		shell: {
			docco: {
				command: 'docco'+
				' lib/SignalTree.js'+
				' lib/Topic.js'+
				' lib/Subscription.js'+
				' test/Observer_test.js',
				stderr: true,
				failOnError: true
			},
			requirejs : {
				command : 'cd lib && node ../r.js -o name=SignalTree out=../dist/Observer.min.js baseUrl=.',
				stderr: true,
				failOnError: true
			},
			_options: {
				stdout: console.log
			}
		},
		lint: {
			files: ['lib/**/*.js', 'test/**/*.js']
		},
		qunit: {
			files: ['test/Observer.html']
		},
		concat: {
			dist: {
				src: ['<banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		min: {
			dist: {
				src: ['<banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},
		uglify: {}
	});

	grunt.registerTask('default', 'shell qunit')

}
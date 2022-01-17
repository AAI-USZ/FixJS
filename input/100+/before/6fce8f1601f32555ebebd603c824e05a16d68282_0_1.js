function (grunt) {

	// Project configuration.
	grunt.initConfig({
		distDir: 'build/BuildReactor',
		clean: {
			src: [ 'build' ]
		},
		lint: {
			files: ['src/**/*.js', 'spec/**/*.js']
		},
		jshint: {
			options: {
				bitwise: true,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				plusplus: false,
				regexp: true,
				undef: true,
				strict: false,
				trailing: true,

				eqnull: true,
				es5: true,

				browser: true,
				devel: true
			},
			globals: {
				beforeEach: true,
				chrome: true,
				define: true,
				describe: true,
				expect: true,
				it: true,
				jasmine: true,
				loadFixtures: true,
				require: true,
				spyOn: true
			}
		},
		mincss: {
			compress: {
				files: {
					'build/BuildReactor/css/options.css': [ 'css/options.css' ],
					'build/BuildReactor/src/bamboo/options.css': [ 'src/bamboo/options.css' ],
					'build/BuildReactor/src/cctray/options.css': [ 'src/cctray/options.css' ]
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "src",
					dir: 'build/BuildReactor/src',
					removeCombined: true,
					inlineText: true,
					//useStrict: true,
					preserveLicenseComments: true,
					optimizeCss: 'none',
					wrap: {
						startFile: 'grunt.startFile.js',
						endFile: 'grunt.endFile.js'
					},
					paths: {
						amdUtils: '../lib/amd-utils',
						bootstrap: 'empty:',
						handlebars: '../lib/requirejs-handlebars-plugin/Handlebars',
						jquery: 'empty:',
						jqueryTools: 'empty:',
						signals: 'empty:',
						text: '../lib/requirejs/text',
					},
					modules: [
						{
							name: 'main'
						},
						{
							name: 'options'
						},
						{
							name: 'bamboo/settingsController'
						},
						{
							name: 'bamboo/buildService'
						},
						{
							name: 'cctray/settingsController'
						},
						{
							name: 'cctray/buildService'
						}
					]
				}
			}
		},
		copy: {
			dist: {
				options: {
					basePath: "."
				},
				files: {
					'build/BuildReactor': [
						'background.html',
						'options.html',
						'manifest.json',
						'img/*',
						'src/bamboo/*.html',
						'src/bamboo/*.png',
						'src/cctray/*.html',
						'src/cctray/*.png',
						'lib/jquery/jquery.js',
						'lib/jquery-tools/jquery.tools.min.js',
						'lib/js-signals/signals.js',
						'lib/requirejs/require.min.js',
						'lib/twitter-bootstrap/css/bootstrap.css',
						'lib/twitter-bootstrap/img/*',
						'lib/twitter-bootstrap/js/bootstrap.min.js'
					]
				}
			}
		},
		jasmine: {
			all: ['spec/specrunner.html']
		}
	});

	// Default task.
	grunt.registerTask('default', 'clean mincss requirejs copy');
	grunt.registerTask('full', 'clean lint jasmine mincss requirejs copy');

	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-jasmine-task');
}
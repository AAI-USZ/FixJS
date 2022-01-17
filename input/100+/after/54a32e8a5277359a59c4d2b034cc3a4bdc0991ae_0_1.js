function(grunt){

	// Gesamte Konfiguration des Build-Prozesses
	grunt.initConfig({

		// Gesamten selbstgeschriebenen Non-CoffeeScript-Code (d.h. das Buildsystem) einem
		// Qualitätscheck mittels [JSHint](http://jshint.com) unterziehen.
		lint: {
			build: ['grunt.js', 'build/**/*.js'] // Alle .js-Files in build (inkl. Unterverzeichnisse)
		},

		// Haupt-.styl-File(s) nach CSS kompilieren. Alles was als Modul in die Haupt-Files
		// eingebunden ist, wird direkt in den Output hineinkompiliert.
		stylus: {
			main: {
				file: 'src/stylus/main.styl', // Quelldatei
				dest: '../public/styles/app.css',             // Zieldatei
				options: {                   // Zusatzoptionen
					url: {
						paths: [ 'src/stylus', 'images' ]   // Pfad(e) für Bilder
					},
					compress: false             // Code-Komprimierung an/aus
				}
			}
		},

		coffee: {
			main: {
				dir: 'src/coffee/',
				dest: 'tmp/scripts/'
			}
			// test: {
			//   dir: 'test/coffee/**/*.coffee',
			//   dest: 'tmp/test/scripts/'
			// }
		},

		// JS-Tests mit QUnit in einer PhantomJS-Instanz durchführen. Quasi ein Browsertest
		// ohne Browser.
		qunit: {
			all: (function() {
				var files = grunt.file.expandFiles('test/*.html');
				var result = [];
				files.forEach(function(file){
					result.push('http://localhost:16000/' + file);
				});
				return result;
			})()
		},

		server: {
			port: 16000,
			base: '.'
		},

		// Dokumentation aus den .coffee-Files erstellen
		docco: {
			src: {
				files: [             // Zu dokumentierende Files
					'src/**/*.coffee',
					'grunt.js'
				],
				dest: ''             // Zielverzeichnis, in dem `/docs` angelegt wird
			}
		},

		// RequireJS-Module zusammenfügen, komprimieren und optimieren
		requirejs: {
			baseUrl: 'tmp/scripts',  // Script-Source-Verzeichnis
			paths: {                  // Pfade für Libraries mit doofen/abweichenden Dateinamen
				'jquery': '../../lib/jquery-1.7.2',      // Versionsnummer
				'jquery-ui': '../../lib/jquery-ui-1.8.21.custom.min',
				'backbone': '../../lib/backbone-amd',    // AMD-Build (https://github.com/amdjs)
				'underscore': '../../lib/underscore-amd', // AMD-Build (https://github.com/amdjs)
				'handlebars': '../../lib/Handlebars-1.0.beta.6', // AMD-Build (https://github.com/SlexAxton/require-handlebars-plugin)
				'modernizr': '../../lib/modernizr-2.5.3'
			},
			name: 'main',             // Wurzelmodul
			out: '../public/scripts/app.js',            // Zieldatei
			optimize: 'none'          // Optimierung deaktivieren (Debugging/Schnellerer Build)
		},

		// Cleanup; die aus CS generierten JS-Files entfernen
		// cleanup: {
		//   src:  '<config:coffee.src>', // Alle Source-JS-Files
		//   test: '<config:coffee.test>' // Alle Test-JS-Files
		// },

		copy: {
			images: {
				src: ['images/**/*'],
				dest: '../public'
			},
			requirejs: {
				src: ['scripts/**/*'],
				dest: '../public'
			}
		},

		clean: {
			folder: "tmp"
		},

		watch: {
			files: ['src/**/*', 'lib/**/*', 'images/**/*'],
			tasks: 'defaultWatch'
		}

	});

	// Nicht fest in Grunt eingebaute Tasks laden
	grunt.loadTasks('build/tasks');         // Alle Tasks in build/task, z.B. der CS-Compiler
	grunt.loadNpmTasks('grunt-requirejs'); // Task in Form eines NPM-Moduls
	grunt.loadNpmTasks('grunt-clean'); // Task in Form eines NPM-Moduls


	// Alle automatisch zu startenden Tasks unter dem Label 'default' ablegen
	// `cleanup` rauswerfen um die generierten JavaScript-Dateien zu inspizieren
	grunt.registerTask('default', 'lint stylus coffee server qunit docco requirejs copy clean');

	grunt.registerTask('defaultWatch', 'lint stylus coffee requirejs copy clean');

}
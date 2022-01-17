function testsetup(snippet) {
		// doU with 'it'
		var doUCompiled = doU.template(snippet);
		// doT with 'it'
		var doTCompiledParam = doT.template(snippet);
		// doT with 'this'
		var doTCompiled = doT.template(snippet.replace(/=it\./g, '=this.'));
		// doT with 'it' and append = false
		doT.templateSettings.append = false;
		var doTCompiledNoAppend = doT.template(snippet);

		jslitmus.test('doU.js', function() {
			doUCompiled(data);
		});

		jslitmus.test('doU.js - looping', function(count) {
			while (count--) {
				doUCompiled(data);
			}
		});

		jslitmus.test('doT.js - using this', function() {
			doTCompiled.call(data);
		});

		jslitmus.test('doT.js - using this - looping', function(count) {
			while (count--) {
				doTCompiled.call(data);
			}
		});

		jslitmus.test('doT.js - using it', function() {
			doTCompiledParam(data);
		});

		jslitmus.test('doT.js - using it - looping', function(count) {
			while (count--) {
				doTCompiledParam(data);
			}
		});

		jslitmus.test('doT.js - append off', function() {
			doTCompiledNoAppend(data);
		});

		jslitmus.test('doT.js - append off - looping', function(count) {
			while (count--) {
				doTCompiledNoAppend(data);
			}
		});
}
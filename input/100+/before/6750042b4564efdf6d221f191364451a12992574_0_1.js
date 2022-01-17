function() {
			var customEngineFilesList	= (customEngineFiles instanceof Array) ? customEngineFiles : [customEngineFiles];
			var engineFiles 			= (useCustomeEngine) ? customEngineFilesList: [path+'/lib/three.js/Detector.js', path+'lib/three.js/three.js', path+'lib/three.js/stat.js', path+'utils/graphics/threeEngine.js', path+'utils/graphics/divEngine.js'];
			scripts 					= (scripts instanceof Array) ? scripts : [scripts];

			load([
					path+'utils/class.js'
				]).then([
					path+'utils/crossBrowser.js',
					path+'utils/events.js',
					server+'/socket.io/socket.io.js',
					path+'lib/javascript-astar/astar-min.js',					
				]).then([
					path+'cassidie.js',
				]).then([					
					path+'account.js',
					path+'chat.js',
					path+'components/game.js',
					path+'components/level.js',
					path+'components/entity.js'
				]).then([
					path+'components/item.js',
					path+'components/character.js'
				]).then(engineFiles).then(scripts).thenRun(function() {
					Cassidie.start(server, targetDiv, useCustomeEngine);
				}
			);
		}
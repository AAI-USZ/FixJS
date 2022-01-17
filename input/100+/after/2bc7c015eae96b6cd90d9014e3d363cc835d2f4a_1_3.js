function( attributes ){

	var attributes = attributes || {};
	var flow = this;
	var s3;
	var tmp;

	flow.name =				attributes.name;
	flow.type =				attributes.type;
	flow.extensions =		attributes.extensions;
	flow.base_path =		attributes.base_path || config.base_path;
	flow.paths =			attributes.paths;
	flow.files =			{};
	flow.compress =			attributes.compress || config.compress;
	flow.watch =			attributes.watch || config.watch;
	flow.jst_lang =			attributes.jst_lang;
	flow.jst_namespace =	attributes.jst_namespace;
	flow.encoding =			attributes.encoding || config.encoding;
	flow.string =			'';
	flow.url =				'';

	// Validate flow name
	if( typeof flow.name === 'function' )
		flow.name = flow.name();
	if( typeof flow.name !== 'string' )
		throw new Error('\'name\' must be a string or a function that returns a string');
	if( flow.name.length < 1 )
		throw new Error('\'name\' cannot be empty');

	// Validate flow type
	if( typeof flow.type === 'function' )
		flow.type = flow.type();
	if( typeof flow.type !== 'string' )
		throw new Error('\'type\' must be a string or a function that returns a string');
	if( flow.type !== 'css' && flow.type !== 'js' && flow.type !== 'javascript' && flow.type !== 'jst' )
		throw new Error('\'type\' must be \'css\', \'js\', or \'jst\'');
	if( flow.type === 'javascript' )
		flow.type === 'js';
	
	// Set valid extensions for this flow
	if( !flow.extensions ){
		if( flow.type === 'js' )
			flow.extensions = ['js'];
		else if( flow.type === 'css' )
			flow.extensions = ['css'];
		else if( flow.type === 'jst' )
			flow.extensions = ['jst'];
	}
	
	// Validate paths
	if( typeof flow.paths === 'string' )
		flow.paths = [flow.paths];
	if( !_isArray(flow.paths) )
		throw new Error('\'paths\' must be a string or array of strings');
	if( flow.paths.length < 1 )
		throw new Error('\'paths\' must contain relative paths as strings');
	flow.paths.forEach( function( path, i ){
		if( typeof path === 'function' )
			path = path();
	});

	// Validate host
	if( !config.host )
		throw new Error('\'host\' must be set');

	// Validate host (s3)
	if( config.host.provider === 's3' ){
		if( !config.aws_key )
			throw new Error('\'aws_key\' must be set');
		if( !config.aws_secret )
			throw new Error('\'aws_secret\' must be set');
		if( !config.s3_bucket )
			throw new Error('\'bucket\' must be set');
		// Create knox client
		s3 = knox.createClient({
			key: config.host.aws_key,
			secret: config.host.aws_secret,
			bucket: config.host.bucket
		});
	}
	// Validate host (local)
	else if( config.host.provider === 'local' ){
		if( !config.host.path )
			throw new Error('local_path must be set');
		if( typeof config.host.path === 'function' )
			config.host.path = config.host.path();
		if( typeof config.host.path !== 'string' )
			throw new Error('\'path\' must be a string or a function that returns a string');
	}

	// jst_namespace default
	if( flow.type === 'jst' && !flow.jst_namespace )
		flow.jst_namespace = 'JST';

	// _flow()
	// Generates a flow, can be run manually to regenerate a flow
	flow._flow = function(){
		console.log('FLOW TRIGGERED WITH', arguments);
		flow._add();
		if( flow.compress )
			flow._compress();
		( config.host.provider === 'local' )
			? flow._write()
			: flow._send();

	};

	// _add()
	// Adds specific files to flow
	flow._add = function(){
		
		flow.files = {};
		flow.string = '';
		
		// Convert folder paths to lists of file paths
		// Add all file paths to files array
		var addFiles = function( paths, root ){
			
			paths.forEach( function( path, i ){	

				var true_path = _getTruePath( root, path );
				var exists = fs.existsSync( true_path );

				if( !exists )
					return console.log('WARNING: '+ true_path +' does not exist!');

				var stats = fs.statSync( true_path );

				if( stats.isDirectory() ){
					var files = fs.readdirSync( true_path );
					addFiles( files, true_path );
				}
				else if( stats.isFile() ){

					var extension = _getExtension( true_path );
					var is_extension_relevant = !flow.extensions.indexOf( extension );
					var is_added = ( typeof flow.files[true_path] !== 'undefined' );

					if( is_extension_relevant && !is_added ){
						
						var contents = fs.readFileSync( true_path, 'utf-8' );
						// Remove BOM (Byte Mark Order)
						if( contents.charCodeAt(0) === 65279 )
							contents = contents.substring(1);
						contents = _preprocess( true_path, contents, flow );
						flow.files[true_path] = contents;
						flow.string += contents +'\r\n';

					}

				}
				else
					throw new Error('path "'+ true_path +'" is invalid! Must be a file or directory');

			});

		};
		
		addFiles( flow.paths, flow.base_path );
		
	};

	// _compress()
	// Compresses file string
	flow._compress = function(){

		if( flow.type === 'js' || flow.type === 'jst' ){
			try {
				var parser = uglifyJS.parser;
				var uglify = uglifyJS.uglify;
				var ast = parser.parse( flow.string );
				ast = uglify.ast_mangle( ast );
				ast = uglify.ast_squeeze( ast );
				flow.string = uglify.gen_code( ast );
			}
			catch( err ){
				console.error( 'Error when compressing JS: ', err );
			}
		}
		else if( flow.type === 'css' ){
			try {
				var process = cleanCSS.process;
				flow.string = process( flow.string );
			}
			catch( err ){
				console.error( 'Error when compressing CSS: ', err );
			}
		}

	};

	// _write()
	// Writes file to disk
	flow._write = function(){

		var time = new Date().getTime();
		var filename = time +'_'+ flow.name;
		
		if( flow.path )
			fs.unlinkSync( flow.path );
		fs.writeFileSync( config.host.path +'/'+ filename, flow.string, flow.encoding );
		flow.path = config.host.path +'/'+ filename;
		flow.url = config.host.url +'/'+ filename;
		
		if( config.debug )
			console.log( flow.url );
		
	};

	// _send()
	// Sends file to third-party
	flow._send = function(){

		// TODO send the new file directly to S3
		var tmp = './'+ flow.name;
		var time = new Date().getTime();

		fs.writeFileSync( tmp, flow.string, flow.encoding );
		s3.putFile( tmp, time +'_'+ flow.name, flow._receive );

	};

	// _receive()
	// Accepts third-party response
	flow._receive = function( err, res ){

		if( err )
			throw new Error( err );
		if( res.statusCode !== 200 )
			throw new Error( 'S3 upload failed' );
		else {
			fs.unlink( tmp );
			flow.url = res.client._httpMessage.url;
			igneous[flow.name] = flow.url;
			flow.string = '';
			tmp = '';
		}

	};

	// _watch()
	// Watches specified paths for changes and regenerates the flow
	flow._watch = function(){

		var root = flow.base_path;
		var true_paths = [];

		flow.paths.forEach( function( path, i ){

			var true_path = _getTruePath( root, path );
			var exists = fs.existsSync( true_path );

			if( !exists )
				return console.log('WARNING: '+ true_path +' does not exist!');

			var stats = fs.statSync( true_path );
			var is_file = stats.isFile();
			var is_directory = stats.isDirectory();
			
			if( !is_file && !is_directory )
				throw new Error('path "'+ true_path +'" is invalid! Must be a file or directory');

			true_paths.push( true_path );

		});

		var watcher = chokidar.watch( true_paths, {
			persistent: true
		});
		watcher.on( 'add', flow._flow );
		watcher.on( 'change', flow._flow );
		watcher.on( 'unlink', flow._flow );

	};

	if( flow.watch )
		flow._watch();

	// tag()
	// Shortcut for igneous.tag()
	flow.tag = igneous.tag( flow );

	if( !config.test )
		flow._flow();

}
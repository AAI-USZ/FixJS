function(){
		
		var root = flow.base_path;
		var watch_timeouts = {}; // get around a node.js watch bug...
		
		flow.paths.forEach( function( path, i ){
			
			var true_path = ( root.charAt( root.length-1 ) === '/' || root === '' )
				? root + path
				: root +'/'+ path;
			var stats = fs.statSync( true_path );
			var is_file = stats.isFile();
			var is_directory = stats.isDirectory();
			
			if( !is_file && !is_directory )
				throw new Error('path "'+ true_path +'" is invalid! Must be a file or directory');
			
			fs.watch( true_path, function( event, filename ){
				
				var file = ( is_file )
					? true_path
					: true_path + filename;
				
				if( watch_timeouts[file] )
					clearTimeout( watch_timeouts[file] );
				watch_timeouts[file] = setTimeout( function(){
					flow._flow();
					if( config.debug )
						console.log( 'Updated: '+ file );
				}, 50 );
				
			});
				
		});
		
	}
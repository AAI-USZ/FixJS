function( paths, root ){
			
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

		}
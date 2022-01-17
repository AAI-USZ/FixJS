function( event, filename ){
				
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
				
			}
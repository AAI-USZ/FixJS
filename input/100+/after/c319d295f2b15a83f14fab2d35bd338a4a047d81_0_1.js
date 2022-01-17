function () {
			// Add ECMA262-5 Array method filter if not supported natively.
			// But we will be very conservative and add to this single array
			// object so that we do not tamper with the native Array prototype
			// object
			if ( !( 'filter' in Array.prototype ) ) {
				urlset.filter = function ( filter, that /*opt*/ ) {
					var other = [],
					    v,
					    i = 0,
					    n = this.length;
					
					for ( ; i < n; i++ ) {
						if ( i in this && filter.call( that, v = this[ i ], i, this ) ) {
							other.push( v );
						}
					}
					
					return other;
				};
			}
			
			if ( typeof Aloha.settings.repositories != 'undefined' 
					&& typeof Aloha.settings.repositories.linklist.data != 'undefined' ) {
				urlset = Aloha.settings.repositories.linklist.data;
			}
			
			var l = urlset.length;
			
			// generate folder structure
		    for ( var i = 0; i < l; ++i ) {
		    	var e = urlset[ i ];
		    	e.repositoryId = this.repositoryId;
		    	e.id = e.id ? e.id : e.url;
				
		    	var u = e.uri = this.parseUri( e.url ), 
					// add hostname as root folder
		    	    path = this.addFolder( '', u.host ),
				    pathparts = u.path.split( '/' );
				
		    	for ( var j = 0; j < pathparts.length; j++ ) {
		    		if ( pathparts[ j ] &&
		    			 // It's a file because it has an extension.
		    			 // Could improve this one :)
		    			 pathparts[ j ].lastIndexOf( '.' ) < 0 ) {
			    		path = this.addFolder( path, pathparts[ j ] );
		    		}
		    	}
				
		    	e.parentId = path;
		    	
				urlset[ i ] = new Aloha.RepositoryDocument( e );
		    }
			
		    this.repositoryName = 'Linklist';
		}
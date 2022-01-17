function( resources ){
			var retResources = new Array();
			var x = resources.length - 1;
			for( ; x >= 0; x-- ){
				retResources.push( resources[x] );
			}
			callback( null, retResources );
		}
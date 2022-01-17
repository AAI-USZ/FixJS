function( target ){
		
		_this.$target = $( target );
		_this.$target.text('loading...');
		
		var hashTag = location.hash;
		if( hashTag != "" ){
			_this.buildWallForQuery( hashTag.substr(1) ); 
		} else { 
			_this.getNewsQuery( function( query ){
				location.hash = '#' + query;
				_this.buildWallForQuery( query );
			})
		}
		
		// Setup document bindings: 
		$( window ).bind('hashchange', function( event ) {
			_this.$target.html('loading ...');
			var hashTag = location.hash;
			_this.buildWallForQuery( hashTag.substr(1) ); 
		});
	}
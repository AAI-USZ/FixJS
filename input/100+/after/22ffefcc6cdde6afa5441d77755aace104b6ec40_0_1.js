function(){
		if( _console && _console.log ){
			try{
				_console.log.apply( _console, arguments );
				this.each(function(){ _console.log.apply( _console, arguments ); });
			} catch(e){
				try{
					// Hack for IE, which doesn't allow .apply on console methods.
					for( var i in arguments ){ _console.log( arguments[i] ); }
					this.each(function(i,elem){ _console.log( i, elem ); })
				} catch(e){ /* Just in case... */}
			}
		}
		return this;
	}
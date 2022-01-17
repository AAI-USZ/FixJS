function(buffer) { 
	    	track.buffer = buffer;
	    	track.revBuffer = track.reverseBuffer( buffer );
	    	track.trackElement.classList.remove( "loading" );
		}
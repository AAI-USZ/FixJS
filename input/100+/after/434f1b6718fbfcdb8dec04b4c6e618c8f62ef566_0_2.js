function(msg) {
    	if( ! users [ msg.user ] ){
    		users [ msg.user ] = {
    				'name' : name
    			}
	    };
        if (msg.data.videoOver) {
        	users [ msg.user ][ 'videoOver' ] = msg.data.videoOver;
        } else if (msg.data.videoOut) {
        	users [ msg.user ][ 'videoOver' ]  = null;
        }
        if (msg.data.videoOver || msg.data.videoOut) {
            _this.syncInterface();
        }
    }
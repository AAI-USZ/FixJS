function(data) {
    	if( ! users [ data.user] ){
    		users [ data.user] = {
    				'name' : name
    			}
	    };
        if (data.videoOver) {
        	users [ data.user ][ 'videoOver' ] = data.videoOver;
        } else if (data.videoOut) {
        	users [ data.user ][ 'videoOver' ]  = null;
        }
        _this.syncInterface();
    }
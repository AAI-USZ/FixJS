function( _fid ) {
//		console.log("in setFacebook, _fid = " + _fid );
		url = "http://www.facebook.com/pages/music/" + _fid;
		
		this.artistFacebookID = _fid;
		this.artistFacebookURL = url;

		this.get("model").dprChange();
	}
function(e) {
		enyo.log('on connect click');
		var clientID = '9b384ddcfacc427c99396cc068f2798b';
		var redirectUri = 'http://instagrio.tsung.bz/token';
		var url = 'https://api.instagram.com/oauth/authorize/?client_id=' + clientID + '&redirect_uri=' + redirectUri + '&response_type=code&scope=likes+comments+relationships';
		enyo.log('opening url: ' + url);
		//document.location.href = url;
		
		//now waiting for user to input passcode
		new io.OAuthPasscode().renderInto(document.body);
	}
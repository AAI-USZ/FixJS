function() {
		_this.view = _this.iframe.contentWindow;
		_this.postMsg(_this.view, "REGISTER");

		setTimeout( function() { _this.doLoop(); }, 500 );
	}
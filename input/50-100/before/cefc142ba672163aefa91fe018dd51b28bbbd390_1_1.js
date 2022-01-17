function() {
		var _this = this;
		// Always update videoHolder height
		$('#videoHolder').height( window.innerHeight - _this.getComponentsHeight() );
	}
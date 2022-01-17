function( windowHeight ) {
		windowHeight = windowHeight || window.innerHeight;
		var newHeight = windowHeight - this.getComponentsHeight();
		var currentHeight = $('#videoHolder').height();
		// Always update videoHolder height
		if( currentHeight !== newHeight ) {
			mw.log('EmbedPlayer: updateLayout:: window: ' + windowHeight + ', components: ' + this.getComponentsHeight() + ', videoHolder height: ' + newHeight );
			$('#videoHolder').height( newHeight );
		}
	}
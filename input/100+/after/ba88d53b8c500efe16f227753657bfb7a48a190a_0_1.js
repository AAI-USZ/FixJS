function(props){
		if(!$.support.fullscreen || this.length !== 1) {
			// The plugin can be called only
			// on one element at a time

			return this;
		}

		if(fullScreenStatus()){
			// if we are already in fullscreen, exit
			cancelFullScreen();
			return this;
		}

		// You can potentially pas two arguments a color
		// for the background and a callback function

		var options = $.extend({
			'background'      : '#111',
			'callback'        : $.noop( ),
			'fullscreenClass' : 'fullScreen'
		}, props),

		elem = this,

		// This temporary div is the element that is
		// actually going to be enlarged in full screen

		fs = $('<div>', {
			'css' : {
				'overflow-y' : 'auto',
				'background' : options.background,
				'width'      : '100%',
				'height'     : '100%'
			}
		})
			.insertBefore(elem)
			.append(elem);

		// You can use the .fullScreen class to
		// apply styling to your element
		elem.addClass( options.fullscreenClass );

		// Inserting our element in the temporary
		// div, after which we zoom it in fullscreen

		requestFullScreen(fs.get(0));

		fs.click(function(e){
			if(e.target == this){
				// If the black bar was clicked
				cancelFullScreen();
			}
		});

		elem.cancel = function(){
			cancelFullScreen();
			return elem;
		};

		onFullScreenEvent(function(fullScreen){
			if(!fullScreen){
				// We have exited full screen.
				// Remove the class and destroy
				// the temporary div

				elem.removeClass( options.fullscreenClass ).insertBefore(fs);
				fs.remove();
			}

			// Calling the user supplied callback
			options.callback(fullScreen);
		});

		return elem;
	}
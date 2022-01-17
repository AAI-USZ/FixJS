function(fullScreen){
			if(!fullScreen){
				// We have exited full screen.
				// Remove the class and destroy
				// the temporary div

				elem.removeClass( options.fullscreenClass ).insertBefore(fs);
				fs.remove();
			}

			// Calling the user supplied callback
			options.callback(fullScreen);
		}
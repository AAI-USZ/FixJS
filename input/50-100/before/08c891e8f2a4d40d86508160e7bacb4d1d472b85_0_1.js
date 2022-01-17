function(e){
						// touchstart-->touchend will automatically generate a click event, but there are problems
						// on iOS after focus has been programatically shifted (#14604, #14918), so do it manually.
						e.preventDefault();
						on.emit(e.target, "click", {
							cancelable: true,
							bubbles: true
						});
					}
function(e){
						// Setup timer to fire synthetic click event after other touchend listeners finish executing
						var target = e.target;
						clickTimer = setTimeout(function(){
							clickTimer = null;
							on.emit(target, "click", {
								cancelable: true,
								bubbles: true
							});
						}, 0);

						// Prevent the touchend from triggering the native click event
						e.preventDefault();
					}
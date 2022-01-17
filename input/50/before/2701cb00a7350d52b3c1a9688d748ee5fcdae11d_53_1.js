function(){
						if(focusedOut && document.activeElement !== datePicker[0]){
							resetFocusHandler();
							datePicker.trigger('focusout');
							datePicker.triggerHandler('blur');
						} else {
							resetFocusHandler();
						}
					}
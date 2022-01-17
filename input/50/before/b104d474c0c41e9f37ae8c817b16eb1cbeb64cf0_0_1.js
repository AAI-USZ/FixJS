function(){
						orgCallback.apply(this);
						// The immediate removal from the dom may interfere with animation
						$(this).dialog('close').remove();
					}
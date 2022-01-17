function(){
				var selection = (window.getSelection()).toString();
				if(!selection.length) return;
				else {
					bHandler.enableButtons($('a.disabled'));
				}
			}
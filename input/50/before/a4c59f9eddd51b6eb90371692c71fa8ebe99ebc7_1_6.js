function() {
        
			  if (window.self != window.top) { //we're in an iframe
		      top.exports.setEditorFocus(false);
		    }
			}
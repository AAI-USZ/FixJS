function pollForEditor(panel_window) {
	    var timeoutId; 
		if (panel_window && panel_window.orionEditor) {
  		  setEditor(panel_window); // the current listener
  		  panel.onShown.removeListener(pollForEditor);
        } else {
          setTimeout(pollForEditor.bind(null, panel_window), 100);
        }
		
		if (!panel_window) {
		    console.log("no panel_window", chrome.extension.lastError);
		}
	}
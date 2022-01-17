function(start_now, buttons){
	
		if (wmd.wmd_env.autostart === false) {
			util.makeAPI();
			return;
		}

        if (buttons){
            wmd.wmd_env.buttons = buttons;
        }

		var edit;		// The editor (buttons + input + outputs) - the main object.
		var previewMgr;	// The preview manager.
		
		// Fired after the page has fully loaded.
		var loadListener = function(){
		
			wmd.panels = new wmd.PanelCollection();
			
			previewMgr = new wmd.previewManager();
			var previewRefreshCallback = previewMgr.refresh;
						
			edit = new wmd.editor(previewRefreshCallback);
			
			previewMgr.refresh(true);
			
		};
		
        if (start_now){
            loadListener();
        } else {
		    util.addEvent(top, "load", loadListener);
        }
	}
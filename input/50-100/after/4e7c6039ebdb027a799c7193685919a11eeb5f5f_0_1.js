function()
		{
		    if(this.editor.fullscreen_is_enabled)
		        win.zIndexManager.setBase(200000);
		    
			if(s.left && s.top)
				win.setPagePosition(s.left, s.top);
			var pos = win.getPosition();
			s.left = pos[0];
			s.top = pos[1];
			this.onOpen.dispatch(this, s, p);
		}
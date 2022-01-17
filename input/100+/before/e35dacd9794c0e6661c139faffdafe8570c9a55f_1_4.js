function(event) {
                	if (!event) event = cwin.event;
    				Ext.getCmp("qwbuilder_startupPanel").getActiveTab().el.dom.hasFocus = cwin.id;
    	        	if (event.keyCode == 'F'.charCodeAt(0) && (event.ctrlKey || event.metaKey)) {
    	        		cwin.parent.Builder.searchInBespin(cwin);
    	        		try {
    	        			event.stopPropagation();
    	        			event.cancelBubble = true;
    	        		} catch(e){};
    	        		return false;
    	        	} else if (event.keyCode == "S".charCodeAt(0) && (event.ctrlKey || event.metaKey)) {
				cwin.txt.save();
				try {
    	        			event.stopPropagation();
    	        			event.cancelBubble = true;
				} catch(e){};
				return false;
			} else if (event.ctrlKey && event.altKey) {
    	        		if (event.keyCode == 39) {
    	        			if (window.switching) return;
    	        			window.switching = true;
    	        			Builder.blurBespin(el);
    	        			Builder.nextTab(event);
    	        			setTimeout(function() { window.switching = false; }, 200);
    	        			return false;
    	        		} else if (event.keyCode == 37) {
    	        			if (window.switching) return;
    	        			window.switching = true;
    	        			Builder.blurBespin(el);
    	        			Builder.previousTab(event);
    	        			setTimeout(function() { window.switching = false; }, 200);
    	        			return false;
    	        		}
    	        	} else if (event.ctrlKey && event.shiftKey) {
    	        		if (event.keyCode == "D".charCodeAt(0)) {
    	        			Builder.quickOpen();
    	        		} else if (event.keyCode == "A".charCodeAt(0)) {
    						Builder.queryTest();
    	        		} else if (event.keyCode == "Q".charCodeAt(0)) {
    	        			if (!win.parent.closed) {
    	        				win.parent.closed = true;
    	            			Builder.closeCurrentTab();  
    	            			setTimeout(function() {cwin && cwin.parent && (cwin.parent.closed = false);}, 100);
    	                		try {
    	                			event.stopPropagation();
    	                			event.cancelBubble = true;
    	                		} catch(e){};
    	                		return false;
    	        			}
				}           		
    	        	}
                }
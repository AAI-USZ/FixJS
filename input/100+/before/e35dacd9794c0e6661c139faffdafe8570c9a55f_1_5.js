function() {
                cwin.prails = Object.clone(obj);
                cwin.id = document.getElementsByName(el.id)[0].contentWindow.name;
                cwin.el = el;
                var data = JSON.parse(el.getAttribute("data-bespinoptions"));
                cwin.txt.setBrush(data.syntax);
                if (data.html == true) {
                	cwin.txt.enableHtmlScript();
                }
                if (obj && obj.save) {
                	cwin.txt.save = obj.save;
                }
		cwin.txt.changed = function(mode, code) {
			var functions = {"text/x-php": "checkPHPSyntax", "application/x-httpd-php": "checkHtmlSyntax", "text/javascript": "checkJSSyntax"};
			if (functions[mode]) {
				var result = Builder[functions[mode]](code, function(errors) {
					if (cwin.txt.previousErrors) for (var i = 0; i < cwin.txt.previousErrors.length; i++) {
						cwin.txt.editor.clearMarker(cwin.txt.previousErrors[i].line - 1);
						cwin.el.style.border = "inherit";
					}
					if (errors) {
						for (var i = 0; i < errors.length; i++) {
							var info = cwin.txt.editor.lineInfo(errors[i].line - 1);
							if (info && !info.markerText) {
								cwin.txt.editor.setMarker(errors[i].line - 1, "<span class='error' title=\""+errors[i].message.replace(/"/g, "''")+"\"><span>&bull;</span></span>"+errors[i].line);
							}
						}
						cwin.el.style.border = "1px solid red";

						cwin.txt.previousErrors = errors;
					}
				});
			}
		};
                cwin.txt.setCode(content);
                if (el.getAttribute("onload")) {
                	try {
                		eval(el.getAttribute("onload"))(cwin.txt);
                	} catch(e){console.log(e);};
                }            
                
                cwin.document.body.onkeydown = function(event) {
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
                };
                if (typeof(fn) == "function") {
                	// fire callback as soon as settled
                	setTimeout(function() {fn.apply(window, [cwin])}, 1);
                }
            }
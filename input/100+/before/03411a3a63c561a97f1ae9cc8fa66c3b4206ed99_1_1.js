function(data) {
		// cache the theme metadata
		this.themeChanged();
		var theme = this.getThemeMeta();
		if(theme && theme.usingSubstituteTheme){
			var oldThemeName = theme.usingSubstituteTheme.oldThemeName;
			var newThemeName = theme.usingSubstituteTheme.newThemeName;
			data.styleSheets = data.styleSheets.map(function(sheet){
				return sheet.replace(new RegExp("/"+oldThemeName,"g"), "/"+newThemeName);				
			});
			data.bodyClasses = data.bodyClasses.replace(new RegExp("\\b"+oldThemeName+"\\b","g"), newThemeName);

			if(this.editor && this.editor.visualEditor && this.editor.visualEditor._onloadMessages){
				this.editor.visualEditor._onloadMessages.push(dojo.replace(
					"Warning. File refers to CSS theme '{0}' which is not in your workspace. Using CSS theme '{1}' instead.", //FIXME: Needs to be globalized
					[oldThemeName, newThemeName]));
			}
		}

        

		this.setHeader({
			title: data.title,
			scripts: data.scripts,
			modules: data.modules,
			styleSheets: data.styleSheets,
			//className: data.className,
			
			bodyClasses: data.bodyClasses,
//FIXME: Research setHeader - doesn't seem to use states info

/*

			maqAppStates: data.maqAppStates,

			maqDeltas: data.maqDeltas,

*/

			style: data.style
		});

		var content = data.content || "";
		
		var active = this.isActive();
		if(active){
			this.select(null);
			dojo.forEach(this.getTopWidgets(), this.detach, this);
		}
		var states = {},
		    containerNode = this.getContainerNode();


		if (data.maqAppStates) {

			states.body = data.maqAppStates;

		}
		dojo.forEach(this.getTopWidgets(), function(w){
			if(w.getContext()){
				w.destroyWidget();
			}
		});

		// remove all registered widgets
        this.getDijit().registry.forEach(function(w) {
              w.destroy();           
        });

        // Set content
		//  Content may contain inline scripts. We use dojox.html.set() to pull
		// out those scripts and execute them later, after _processWidgets()
		// has loaded any required resources (i.e. <head> scripts)
		var scripts;
        // It is necessary to run the dojox.html.set utility from the context
	    // of inner frame.  Might be a Dojo bug in _toDom().
	    this.getGlobal()['require']('dojox/html/_base').set(containerNode, content, {
	        executeScripts: true,
	        onEnd: function() {
	            // save any scripts for later execution
	            scripts = this._code;
	            this.executeScripts = false;
                this.inherited('onEnd', arguments);
	        }
	    });

		// Remove "on*" event attributes from editor DOM.
		// They are already in the model. So, they will not be lost.

		var removeEventAttributes = function(node) {
			if(node){
				dojo.filter(node.attributes, function(attribute) {
					return attribute.nodeName.substr(0,2).toLowerCase() == "on";
				}).forEach(function(attribute) {
					node.removeAttribute(attribute.nodeName);
				});
			}
		};

		removeEventAttributes(containerNode);
		query("*",containerNode).forEach(removeEventAttributes);

		// Convert all text nodes that only contain white space to empty strings
		containerNode.setAttribute('data-maq-ws','collapse');
		var model_bodyElement = this._srcDocument.getDocumentElement().getChildElement("body");
		model_bodyElement.addAttribute('data-maq-ws','collapse');

		// Collapses all text nodes that only contain white space characters into empty string.
		// Skips certain nodes where whitespace does not impact layout and would cause unnecessary processing.
		// Similar to features that hopefully will appear in CSS3 via white-space-collapse.
		// Code is also injected into the page via workbench/davinci/davinci.js to do this at runtime.
		var skip = {SCRIPT:1, STYLE:1},
			collapse = function(element) {
			dojo.forEach(element.childNodes, function(cn){
				if (cn.nodeType == 3){	// Text node
					//FIXME: exclusion for SCRIPT, CSS content?
					cn.nodeValue = cn.data.replace(/^[\f\n\r\t\v\ ]+$/g,"");
				}else if (cn.nodeType == 1 && !skip[cn.nodeName]){ // Element node
					collapse(cn);
				}
			});
		};
		collapse(containerNode);
		this._loadFileStatesCache = states;
		return this._processWidgets(containerNode, active, this._loadFileStatesCache, scripts);
		
		dojo.connect(this.getGlobal(), 'onload', this, function() {
            this.onload();
        });
		
	}
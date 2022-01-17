function(source, callback, scope, newHtmlParams){
		// clear cached values
		delete this._requireHtmlElem;
		delete this._dojoScriptElem;
		delete this.rootWidget;

		// clear dijit registry
		if (this.frameNode) {
			var doc = this.frameNode.contentDocument || (this.frameNode.contentWindow && this.frameNode.contentWindow.document);
			if (doc) {
				windowUtils.get(doc).require("dijit/registry")._destroyAll();				
			}
		}

		this._srcDocument=source;
		
		// if it's NOT the theme editor loading
		if (!source.themeCssFiles) { // css files need to be added to doc before body content
			// ensure the top level body deps are met (ie. maqetta.js, states.js and app.css)
			this.loadRequires(
					"html.body",
					true /*updateSrc*/,
					false /*doUpdateModelDojoRequires*/,
					true /*skipDomUpdate*/
			).then(function(){
					// make sure this file has a valid/good theme
					this.loadTheme(newHtmlParams);						
			}.bind(this));
		}

		//FIXME: Need to add logic for initial themes and device size.
		if(newHtmlParams){
			var modelBodyElement = source.getDocumentElement().getChildElement("body");
			modelBodyElement.setAttribute(MOBILE_DEV_ATTR, newHtmlParams.device);
			modelBodyElement.setAttribute(PREF_LAYOUT_ATTR, newHtmlParams.flowlayout);
			if (newHtmlParams.themeSet){
    			var cmd = new ChangeThemeCommand(newHtmlParams.themeSet, this);
    			cmd._dojoxMobileAddTheme(this, newHtmlParams.themeSet.mobileTheme, true); // new file
			}
			// Automatically include app.css and app.js so users 
			// have a place to put their custom CSS rules and JavaScript logic
			this.addModeledStyleSheet(this.getAppCssRelativeFile(), true /*skipDomUpdate*/);
			var appJsUrl = this.getAppJsRelativeFile();
			this.addHeaderScript(appJsUrl);
		}
		
		// Remove any SCRIPT elements from model that include dojo.require() syntax
		// With Preview 4, user files must use AMD loader
		source.find({elementType:'HTMLElement', tag:'script'}).forEach(function(scriptTag){
			for (var j=0; j<scriptTag.children.length; j++){
				var text = scriptTag.children[j].getText();
				if(text.indexOf('dojo.require')>=0){
					scriptTag.parent.removeChild(scriptTag);
					break;
				}
			}
		});
		
		var data = this._parse(source);
		if (this.frameNode) {
			if(!this.getGlobal()){
				console.warn("Context._setContent called during initialization");
			}

			// tear down old error message, if any
			query(".loading", this.frameNode.parentNode).orphan();

			// frame has already been initialized, changing content (such as changes from the source editor)
			this._continueLoading(data, callback, this, scope);
		} else {
			// initialize frame
			var dojoUrl;
			
			dojo.some(data.scripts, function(url){
				if(url.indexOf("/dojo.js") != -1){
					dojoUrl = url;
					return true;
				}
			});
			
			/* get the base path, removing the file extension.  the base is used in the library call below
			 * 
			 */
			var resourceBase = this.getBase();
			if (!dojoUrl) {
				// pull Dojo path from installed libs, if available
				dojo.some(Library.getUserLibs(resourceBase.toString()), function(lib) {
					if (lib.id === "dojo") {
						var fullDojoPath = new Path(this.getBase()).append(lib.root).append("dojo/dojo.js");
						dojoUrl = fullDojoPath.relativeTo(this.getPath(),true).toString();
						//dojoUrl = new Path(this.relativePrefix).append(lib.root).append("dojo/dojo.js").toString();
						return true;
					}
					return false;
				}, this);
				// if still not defined, use app's Dojo (which may cause other issues!)
				if (!dojoUrl) {
					dojoUrl = this.getDojoUrl();
					console.warn("Falling back to use workbench's Dojo in the editor iframe");
				}
			}
			
			var containerNode = this.containerNode;
			containerNode.style.overflow = "hidden";
			var frame = dojo.create("iframe", this.iframeattrs, containerNode);
			frame.dvContext = this;
			this.frameNode = frame;
			/* this defaults to the base page */
			var realUrl = Workbench.location() + "/" ;
			
			/* change the base if needed */
			
			if(this.baseURL){
				realUrl = this.baseURL;
			}

			var doc = frame.contentDocument || frame.contentWindow.document,
				win = windowUtils.get(doc),
				subs = {
					baseUrl: realUrl
				};

			if (dojoUrl) {
				subs.dojoUrl = dojoUrl;
				subs.id = this._id;

				var config = {
					packages: this._getLoaderPackages() // XXX need to add dynamically
				};
				lang.mixin(config, this._configProps);
				this._getDojoScriptValues(config, subs);

				if (this._bootstrapModules) {
					var mods = '';
					this._bootstrapModules.split(',').forEach(function(mod) {
						mods += ',\'' + mod + '\'';
					})
					subs.additionalModules = mods;
				}
			}

			if(source.themeCssFiles) { // css files need to be added to doc before body content
				subs.themeCssFiles = '' +
				source.themeCssFiles.map(function(file) {
					return '<link rel="stylesheet" type="text/css" href="' + file + '">';
				}).join() +
				'';
			}

			window["loading" + this._id] = function(parser, htmlUtil) {
				var callbackData = this;
				try {
					var win = windowUtils.get(doc),
					 	body = (this.rootNode = doc.body);

					if (!body) {
						// Should never get here if domReady! fired?  Try again.
						this._waiting = this._waiting || 0;
						if(this._waiting++ < 10) {
							setTimeout(window["loading" + this._id], 500);
							console.log("waiting for doc.body");
							return;
						}
						throw "doc.body is null";
					}

					delete window["loading" + this._id];

					body.id = "myapp";

					// Kludge to enable full-screen layout widgets, like BorderContainer.
					// What possible side-effects could there be setting 100%x100% on every document?
					// See note above about margin:0 temporary hack
					body.style.width = "100%";
					body.style.height = "100%";
					// Force visibility:visible because CSS stylesheets in dojox.mobile
					// have BODY { visibility:hidden;} only to set visibility:visible within JS code. 
					// Maybe done to minimize flickering. Will follow up with dojox.mobile
					// folks to find out what's up. See #712
					body.style.visibility = "visible";
					body.style.margin = "0";

					body._edit_context = this; // TODO: find a better place to stash the root context
					this._configDojoxMobile();
					var requires = this._bootstrapModules.split(",");
					if (requires.indexOf('dijit/dijit-all') != -1){
						// this is needed for FF4 to keep dijit.editor.RichText from throwing at line 32 dojo 1.5
						win.dojo._postLoad = true;
					}

					// see Dojo ticket #5334
					// If you do not have this particular dojo.isArray code, DataGrid will not render in the tool.
					// Also, any array value will be converted to {0: val0, 1: val1, ...}
					// after swapping back and forth between the design and code views twice. This is not an array!
					win.require("dojo/_base/lang").isArray = win.dojo.isArray=function(it){
						return it && Object.prototype.toString.call(it)=="[object Array]";
					};
				} catch(e) {
					console.error(e.stack || e);
					// recreate the Error since we crossed frames
					callbackData = new Error(e.message, e.fileName, e.lineNumber);
					lang.mixin(callbackData, e);
				}

				this._continueLoading(data, callback, callbackData, scope);
			}.bind(this);

			doc.open();
			var content = lang.replace(
				newFileTemplate,
				function(_, key) {
					return subs.hasOwnProperty(key) ? subs[key] : '';
				}
			);
			doc.write(content);
			doc.close();

			// intercept BS key - prompt user before navigating backwards
			dojo.connect(doc.documentElement, "onkeypress", function(e){
				if(e.charOrCode==8){
					window.davinciBackspaceKeyTime = win.davinciBackspaceKeyTime = Date.now();
				}
			});	

			// add key press listener
			dojo.connect(doc.documentElement, "onkeydown", dojo.hitch(this, function(e) {
				// we let the editor handle stuff for us
				this.editor.handleKeyEvent(e);
			}));	


			/*win.onbeforeunload = function (e) {//The call in Runtime.js seems to take precedence over this one
				var time = new Date().getTime();
				var shouldDisplay = time - win.davinciBackspaceKeyTime < 100;
				if (shouldDisplay) {
					var message = "Careful! You are about to leave Maqetta.";
					// Mozilla/IE
					// Are you sure you want to navigate away from this page?
					// Careful! You will lose any unsaved work if you leave this page now.
					// Press OK to continue, or Cancel to stay on the current page.
					if (e = e || win.event) {
						e.returnValue = message;
					}
					// Webkit
					// Careful! You will lose any unsaved work if you leave this page now.
					// [Leave this Page] [Stay on this Page]
					return message;
				}
			};*/
		}
	}
function(event){
					this._domIsReady = true;
					var userDoc = event && event.target && event.target.contentDocument;
					var userWindow = userDoc && userDoc.defaultView && userDoc.defaultView.window;
					var deviceName = this.frame.contentDocument.body.getAttribute('data-maq-device');
					var svgfilename = (!deviceName || deviceName == 'none' || deviceName == 'desktop') 
							? null : "app/preview/images/" + deviceName + ".svg";
					if (svgfilename) {
						userWindow.require('dojo/ready')(function(){
				    		var deviceTheme = userWindow.require('dojox/mobile/deviceTheme');        	
				        	deviceTheme.loadDeviceTheme(Silhouette.getMobileTheme(svgfilename));
						});
					}
//					if (dj && dj.subscribe) {
						connect.subscribe("/davinci/scene/selectionChanged", this, function(SceneManager, sceneId) {
							if (!Runtime.currentEditor || Runtime.currentEditor.editorID != "davinci.review.CommentReviewEditor") { 
								return; 
							}
							if (this._commentView) {
								this._commentView.setCurrentScene(SceneManager, sceneId);
							}							
						});
//					}

					userWindow.require("dojo/_base/connect").subscribe("/maqetta/appstates/state/changed", function(args) {
						if (!args || !Runtime.currentEditor || Runtime.currentEditor.declaredClass != "davinci.review.editor.ReviewEditor") { 
							return; 
						}
						var state = args.newState || "Normal";
						var dv = userWindow.davinci;
						if(dv && dv.states && dv.states.setState){
							dv.states.setState(state, args.stateContainerNode, { focus:true, silent:true, updateWhenCurrent:true });
							// Re-publish at the application level
							var newArgs = dojo.clone(args);
							newArgs.editorClass = "davinci.review.editor.ReviewEditor";
							connect.publish("/maqetta/appstates/state/changed", [newArgs]);
						}
					});

					this.rootNode = this.rootWidget = this.frame.contentDocument.body;
					
					// Set "focus" for application states
					var States = require("davinci/maqetta/AppStates");
					var statesFocus = States.prototype.getFocus(this.rootNode);
					if(!statesFocus){
						var stateContainers = States.prototype.getAllStateContainers(this.rootNode);
						if(stateContainers.length > 0){
							var initialState = States.prototype.getInitial(stateContainers[0]);
							States.prototype.setState(initialState, stateContainers[0], { focus:true, updateWhenCurrent:true });
						}
					}
					
					this._initDrawing();
					connect.publish("/davinci/review/context/loaded", [this, this.fileName]);
					
					var newCons = [];
					// add the user activity monitoring to the document and add the connects to be 
					// disconnected latter
					newCons = newCons.concat(this._cxtConns, UserActivityMonitor.addInActivityMonitor(this.frame.contentDocument));
					this._cxtConns = newCons;
					this.containerEditor.silhouetteiframe.setSVGFilename(svgfilename);
					this._statesLoaded = true;
					connect.publish('/davinci/ui/context/statesLoaded', [this]);
					var doc = this.getDocument(), surface = (doc && doc.annotationSurface);
					if(surface){
						this._refreshSurface(surface);
					}
				}
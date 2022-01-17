function(declare, connect, Surface, CreateTool, ExchangeTool, HighlightTool, SelectTool, Runtime, XPathUtils, AppStates, UserActivityMonitor, Review, Context, Silhouette) {

// AppStates functions are only available on the prototype object
var States = AppStates.prototype;

return declare("davinci.review.editor.Context", [Context], {

	setSource: function(){
				
		var containerNode = this.containerNode; 
		var versionInfo = this.resourceFile.parent;
		if (!versionInfo.width)
			containerNode.style.overflowX = "hidden";
		if (!versionInfo.height)
			containerNode.style.overflowY = "hidden";
		if (!this.frame) {
			this.frame = dojo.create("iframe", dojo.mixin(this.iframeattrs, {
				style: {
					border: "0",
					width: versionInfo.width && versionInfo.height ? versionInfo.width + "px" : "100%",
					height: versionInfo.width && versionInfo.height ? versionInfo.height + "px" : "100%"
				},
				src: this.baseURL,
				onload: dojo.hitch(this,function(event){
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
					var statesFocus = States.getFocus(this.rootNode);
					if(!statesFocus){
						var stateContainers = States.getAllStateContainers(this.rootNode);
						if(stateContainers.length > 0){
							var initialState = States.getInitial(stateContainers[0]);
							States.setState(initialState, stateContainers[0], { focus:true, updateWhenCurrent:true });
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
					if(this.surface){
						this._refreshSurface(this.surface);
					}
				})
			}), containerNode);
/*FIXME: Pretty sure it's not needed, so commenting out for now, but leaving around in case problems crop up
			connect.subscribe("/maqetta/appstates/state/changed", function(args) { 

				if (!args || !Runtime.currentEditor || Runtime.currentEditor.editorID != "davinci.review.CommentReviewEditor" ||
						!this.containerEditor || this.containerEditor != Runtime.currentEditor) { 
					return; 
				}
				// Push the state change down into the review document
				var userWin = this.frame && this.frame.contentDocument && this.frame.contentDocument.defaultView;
				if(userWin && userWin.davinci && userWin.davinci.states && userWin.davinci.states.setState){
					userWin.davinci.states.setState(args.newState, args.stateContainerNode);

				}
			}.bind(this));
*/
		}
	},

	getSelection: function() {
		return []; // Overridden for NOOP behavior
	},

	select: function(){
		// Overridden for NOOP behavior
	},

	_initDrawing: function() {
		// summary:
		//        Create the canvas for annotations, and wait for the shape definition
		//        to add a shape. The shapes will be created one by one.
		//        Shapes with commentId, state and colorAlias(reviewer)
		var doc = this.frame.contentDocument, 
			surface;
		if (!this.surface) {
			surface = this.surface = new Surface(doc.body, doc, this);
			new CreateTool(surface, ["commentId"]);
			new SelectTool(surface, ["commentId"]).activate();
			new ExchangeTool(surface, ["commentId"]);
			new HighlightTool(surface).activate();
		} else {
			surface = this.surface;
		}
		this._cxtConns = [
			 connect.connect(surface.highlightTool, "onShapeMouseDown", function(shape) {
				 connect.publish("/davinci/review/drawing/annotationSelected", [shape.commentId]);
			 }),
			 connect.connect(this.getContainerNode(), "click", dojo.hitch(this, function(evt) {
				 if (!this.containerEditor.isDirty && evt.target === this.getContainerNode()) {
					 connect.publish("/davinci/review/view/canvasFocused", [this]);
				 }
			 }))
			];
		this._cxtSubs = [
			 connect.subscribe(this.fileName+"/davinci/review/drawing/addShape", function(shapeDef, clear, editor) {
				 this.surface.exchangeTool.importShapes(shapeDef, clear, dojo.hitch(Review, Review.getColor)); // FIXME: Unique surface is required
			 }.bind(this)),
			 connect.subscribe(this.fileName+"/davinci/review/drawing/enableEditing", this, function(reviewer, commentId, args) {
				 var pageState = args.pageState;
				 var pageStateList = args.pageStateList;
				 var viewScene = args.viewScene;
				 var viewSceneList = args.viewSceneList;
				 var surface = this.surface;
				 surface.activate();
				 surface.cached = surface.exchangeTool.exportShapesByAttribute();
				 surface.currentReviewer = reviewer;
				 surface.commentId = commentId;
				 surface.filterState = pageState;
				 surface.filterStateList = pageStateList;
				 surface.filterScene = viewScene;
				 surface.filterSceneList = viewSceneList;
				 surface.filterComments = [commentId];
				 this._refreshSurface(surface);
			 }.bind(this)),
			 connect.subscribe(this.fileName+"/davinci/review/drawing/getShapesInEditing", 
					 dojo.hitch(this,function(obj, args) {
				 if (obj._currentPage != this.fileName) {
					 return;
				 }
				 var state = args.state;
				 var stateList = args.stateList;
				 var scene = args.scene;
				 var sceneList = args.sceneList;
				 var surface = this.surface;
				 surface.selectTool.deselectShape();
				 surface.setValueByAttribute("commentId", surface.commentId, "state", state);
				 surface.setValueByAttribute("commentId", surface.commentId, "stateList", stateList);
				 surface.setValueByAttribute("commentId", surface.commentId, "scene", scene);
				 surface.setValueByAttribute("commentId", surface.commentId, "sceneList", sceneList);
				 obj.drawingJson = surface.exchangeTool.exportShapesByAttribute("commentId", [surface.commentId]);
				 surface.deactivate();
				 surface.commentId = "";
			 })),
			 connect.subscribe(this.fileName+"/davinci/review/drawing/cancelEditing", dojo.hitch(this, function() {
				 // Restore the previous status
				 var surface = this.surface;
				 surface.exchangeTool.importShapes(surface.cached, true, dojo.hitch(Review, Review.getColor)); // FIXME: Unique surface is required
				 surface.deactivate();
				 this._refreshSurface(surface);
				 surface.commentId = ""; // Clear the filter so that no shapes can be selected
			 })),
			 connect.subscribe(this.fileName+"/davinci/review/drawing/filter", dojo.hitch(this,function(/*Object*/ stateinfo, /*Array*/ commentIds) {
				 var surface = this.surface;
				 surface.filterState = stateinfo.pageState;
				 surface.filterStateList = stateinfo.pageStateList;
				 surface.filterScene = stateinfo.viewScene;
				 surface.filterSceneList = stateinfo.viewSceneList;
				 surface.filterComments = commentIds;
				 this._refreshSurface(surface);
			 })),
			 connect.subscribe(this.fileName+"/davinci/review/drawing/setShownColorAliases", dojo.hitch(this,function(colorAliases) {
				 var surface = this.surface;
				 surface.filterColorAliases = colorAliases;
				 this._refreshSurface(surface);
			 })),
			 connect.subscribe("/davinci/review/view/openComment", dojo.hitch(this, function() {
	            if (Runtime.currentEditor === this.containerEditor) {
	            	this.containerEditor.isDirty = true;
	            	//Also, tell our container we're dirty
	            	if (this.containerEditor.editorContainer) {
	            		this.containerEditor.editorContainer.setDirty(true);
	    			}
	            }
			 })),
			 connect.subscribe("/davinci/review/view/closeComment", dojo.hitch(this, function() {
				 if (Runtime.currentEditor === this.containerEditor) {
					 this.containerEditor.isDirty = false;
					 //Also, tell our container we're no longer dirty
		            	if (this.containerEditor.editorContainer) {
		            		this.containerEditor.editorContainer.setDirty(false);
		    			}
				 }
			 })),
			 connect.subscribe("/davinci/ui/editorSelected", dojo.hitch(this, function(obj){
				 if (obj.oldEditor!=null && this === obj.oldEditor.getContext && this === obj.oldEditor.getContext()) { // not all editors have a context eg textView
					 // Determine if the editor is closed, if the editor is closed then
					 // getDocument() will throw an exception
					 try {
						 this.getDocument();
					 } catch(err) {
						 // The editor is closed now
						 this._destroyDrawing();
					 }
				 }
			 }))
		];
	},

	_refreshSurface: function(surface) {
		var that = this;
		if(!this._domIsReady){
			return;
		}
		
		// Return true if shape and surface have different values for state or scene
		function differentStateScene(shape, surface){
			if(!shape || !surface){
				return false;
			}
			if(!that.stateSceneCheck(shape.stateList, shape.sceneList, surface.filterStateList, surface.filterSceneList)){
				return true;
			}
			return false;
		}

		var shapes = surface.shapes, result;

		dojo.forEach(shapes, function(shape) {
			var result = "hidden";
			// Note: surface.filterColorAliases.length == 0 in single-user mode
			// The dojo.some check if for multi-user mode
			if (surface.filterColorAliases.length == 0 ||
					dojo.some(surface.filterColorAliases, function(colorAlias) {
				//FIXME: Hack to fix #1486 just before Preview 4 release
				// Old code - quick check - covers case where server uses same string for username and email
				if (shape.colorAlias == colorAlias) {
					return true;
				} else if (davinci && davinci.review && dojo.isArray(Runtime.reviewers)) {
					// New code hack - see if colorAlias matches either username or email corresponding to shape.colorAlias
					var reviewers = Runtime.reviewers;
					var found = false;
					for (var i=0; i<reviewers.length; i++) {
						if (colorAlias == reviewers[i].name || colorAlias == reviewers[i].email) {
							found = true;
							break;
						}
					}
					if (found) {
						if (shape.colorAlias == reviewers[i].name || shape.colorAlias == reviewers[i].email) {
							return true;
						}
					}
					return false;
				}
			})) {
				if (surface.filterComments && surface.filterComments.length > 0) {
					if (dojo.some(surface.filterComments, function(commentId) { 
						return shape.commentId == commentId;
					})){
						result = "visible";
						surface.highlightTool && (surface.highlightTool.shape = shape);
					} else {
						result = "partial";
					}
					if (differentStateScene(shape, surface)) {
						result = "hidden";
					}
				} else {
					if (differentStateScene(shape, surface)){
						result = "hidden";
					} else {
						result = "visible";
					}
				}
			}
			if (shape.commentId == surface.commentId) {
				// Keep the shapes in editing
				result = "visible";
			}
			shape.setVisible(result);
		});
	},

	destroy: function() {
		this._destroyDrawing();
	},
	
	_destroyDrawing: function() {
		try {
			if (this.surface) {
				this.surface.destroy();
				delete this.surface;
			}
		} catch(err) { /*Do nothing*/ }
		dojo.forEach(this._cxtConns, connect.disconnect);
		dojo.forEach(this._cxtSubs, connect.unsubscribe);
	},
	
	getCurrentStates: function(){
		var rootNode = this.rootNode;
		var currentStates = States.getAllCurrentStates(rootNode);
		var arr = [];
		for(var i=0; i<currentStates.length; i++){
			var node = currentStates[i].stateContainerNode;
			var id = node ? node.id : '';
			var xpath = node ? XPathUtils.getXPath(node) : '';
			arr.push({ id:id, xpath:xpath, state:currentStates[i].state });
		}
		return arr;
	},
	
	getCurrentScenes: function(){
		var sceneManagers = this.sceneManagers;
		var sceneManagerObj = {};
		for (var smIndex in sceneManagers) {
			var sm = sceneManagers[smIndex];
			if (sm.getAllSceneContainers && sm.getCurrentScene) {
				var sceneContainers = sm.getAllSceneContainers();
				var arr = [];
				for(var j=0; j<sceneContainers.length; j++){
					var sc = sceneContainers[j];
					var scene = sm.getCurrentScene(sc);
					var sceneId = (scene && scene.id) ? scene.id : '';
					var sceneXpath = (scene && scene.id) ? XPathUtils.getXPath(scene) : '';
					arr.push( {scId:sc.id, scXpath:XPathUtils.getXPath(sc), sceneId:sceneId, sceneXpath:sceneXpath });
				}
				sceneManagerObj[sm.id] = arr;
			}
		}
		return sceneManagerObj;
	},
	
	/**
	 * Returns true if given object's states and scenes match what's in the reference object's
	 * states and scenes.
	 * @param {array} objPageStateList  Array of objects of form
	 *     [ { id:{string}, xpath:{string}, state:{string} } ]
	 *     where id and xpath identify a state container object
	 * @param {object} objViewSceneList  Associative array, with one entry
	 *     for each plugginable "scene container". Each entry in associative
	 *     array is a regular old array (of objects), with one entry for each scene container node.
	 *     Each of these objects with that regular old array has the following form:
	 *     [ { scId:{string}, scXpath:{string}, sceneId:{string}, sceneXPath:{string} } ]
	 *     where scId and scXpath identify a scene container node and
	 *     where sceneId and sceneXPath identify a scene node.
	 * @param {array} refPageStateList  Reference object's state list
	 * @param {object} refViewSceneList  Reference object's scene list
	 */
	stateSceneCheck: function(objPageStateList, objViewSceneList, refPageStateList, refViewSceneList){
		function normalizeNormalState(val){
			return !val ? States.NORMAL : val;
		}
		var i, obj, ref;
		if(objPageStateList && refPageStateList){
			for(i=0; i<refPageStateList.length; i++){
				ref = refPageStateList[i];
				var refState = normalizeNormalState(ref.state);
				obj = objPageStateList[i];
				var objState = normalizeNormalState(obj.state);
				if(obj && ref){
					if(((obj.id && obj.id === ref.id) || 
							(obj.xpath && obj.xpath === ref.xpath)) &&
							objState !== refState){
						return false;
					}
				}
			}
		}
		if(objViewSceneList && refViewSceneList){
			for(var smIndex in refViewSceneList){
				var _refViewSceneList = refViewSceneList[smIndex];
				var _objViewSceneList = objViewSceneList[smIndex];
				if(_refViewSceneList && _objViewSceneList){
					for(i=0; i<_refViewSceneList.length; i++){
						ref = _refViewSceneList[i];
						obj = _objViewSceneList[i];
						if(obj && ref){
							if(((obj && obj.scId && ref && obj.scId === ref.scId) ||
									(obj && obj.scXpath && ref && obj.scXpath === ref.scXpath)) &&
								((obj && obj.sceneId && ref && obj.sceneId !== ref.sceneId) ||
									(obj && obj.sceneXpath && ref && obj.sceneXpath !== ref.sceneXpath))){
								return false;
							}
						}
					}
				}
			}
		}
		return true;
	}

});
}
function() {
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
	}
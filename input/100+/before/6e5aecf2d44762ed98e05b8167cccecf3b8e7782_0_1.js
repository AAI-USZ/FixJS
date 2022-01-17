function(/*dijit/Tree*/ tree, /*dijit/tree/dndSource*/ params){
		// summary:
		//		a constructor of the Tree DnD Source
		// tags:
		//		private
		if(!params){ params = {}; }
		lang.mixin(this, params);
		this.isSource = typeof params.isSource == "undefined" ? true : params.isSource;
		var type = params.accept instanceof Array ? params.accept : ["text", "treeNode"];
		this.accept = null;
		if(type.length){
			this.accept = {};
			for(var i = 0; i < type.length; ++i){
				this.accept[type[i]] = 1;
			}
		}

		// class-specific variables
		this.isDragging = false;
		this.mouseDown = false;
		this.targetAnchor = null;	// DOMNode corresponding to the currently moused over TreeNode
		this.targetBox = null;	// coordinates of this.targetAnchor
		this.dropPosition = "";	// whether mouse is over/after/before this.targetAnchor
		this._lastX = 0;
		this._lastY = 0;

		// states
		this.sourceState = "";
		if(this.isSource){
			domClass.add(this.node, "dojoDndSource");
		}
		this.targetState = "";
		if(this.accept){
			domClass.add(this.node, "dojoDndTarget");
		}

		// set up events
		this.topics = [
			topic.subscribe("/dnd/source/over", lang.hitch(this, "onDndSourceOver")),
			topic.subscribe("/dnd/start", lang.hitch(this, "onDndStart")),
			topic.subscribe("/dnd/drop", lang.hitch(this, "onDndDrop")),
			topic.subscribe("/dnd/cancel", lang.hitch(this, "onDndCancel"))
		];
	}
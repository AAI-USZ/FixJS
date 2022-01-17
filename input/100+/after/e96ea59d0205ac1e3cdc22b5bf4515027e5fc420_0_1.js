function(){
		this._initState();

		// Catch events on TreeNodes
		var self = this;
		this.own(
			on(this.domNode, on.selector(".dijitTreeNode", touch.enter), function(evt){
				self._onNodeMouseEnter(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeNode", touch.leave), function(evt){
				self._onNodeMouseLeave(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeNode", "click"), function(evt){
				self._onClick(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeNode", "dblclick"), function(evt){
				self._onDblClick(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeNode", "keypress"), function(evt){
				self._onKeyPress(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeNode", "keydown"), function(evt){
				self._onKeyDown(registry.byNode(this), evt);
			}),
			on(this.domNode, on.selector(".dijitTreeRow", "focusin"), function(evt){
				self._onNodeFocus(registry.getEnclosingWidget(this), evt);
			})
		);

		// Create glue between store and Tree, if not specified directly by user
		if(!this.model){
			this._store2model();
		}

		// monitor changes to items
		this.connect(this.model, "onChange", "_onItemChange");
		this.connect(this.model, "onChildrenChange", "_onItemChildrenChange");
		this.connect(this.model, "onDelete", "_onItemDelete");

		this.inherited(arguments);

		if(this.dndController){
			if(lang.isString(this.dndController)){
				this.dndController = lang.getObject(this.dndController);
			}
			var params={};
			for(var i=0; i<this.dndParams.length;i++){
				if(this[this.dndParams[i]]){
					params[this.dndParams[i]] = this[this.dndParams[i]];
				}
			}
			this.dndController = new this.dndController(this, params);
		}

		this._load();

		// If no path was specified to the constructor, use path saved in cookie
		if(!this.params.path && !this.params.paths && this.persist){
			this.set("paths", this.dndController._getSavedPaths());
		}

		// onLoadDeferred should fire when all commands that are part of initialization have completed.
		// It will include all the set("paths", ...) commands that happen during initialization.
		this.onLoadDeferred = this.pendingCommandsDeferred;
				
		this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
	}
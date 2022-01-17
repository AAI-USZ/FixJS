function(){
		// summary:
		//		Show my children
		// returns:
		//		Deferred that fires when expansion is complete

		// If there's already an expand in progress or we are already expanded, just return
		if(this._expandDeferred){
			return this._expandDeferred;		// dojo/_base/Deferred
		}

		// cancel in progress collapse operation
		if(this._collapseDeferred){
			this._collapseDeferred.cancel();
			delete this._collapseDeferred;
		}

		// All the state information for when a node is expanded, maybe this should be
		// set when the animation completes instead
		this.isExpanded = true;
		this.labelNode.setAttribute("aria-expanded", "true");
		if(this.tree.showRoot || this !== this.tree.rootNode){
			this.containerNode.setAttribute("role", "group");
		}
		domClass.add(this.contentNode,'dijitTreeContentExpanded');
		this._setExpando();
		this._updateItemClasses(this.item);
		if(this == this.tree.rootNode){
			this.tree.domNode.setAttribute("aria-expanded", "true");
		}

		var def,
			wipeIn = fxUtils.wipeIn({
				node: this.containerNode,
				duration: manager.defaultDuration,
				onEnd: function(){
					def.resolve(true);
				}
			});

		// Deferred that fires when expand is complete
		def = (this._expandDeferred = new Deferred(function(){
			// Canceller
			wipeIn.stop();
		}));

		wipeIn.play();

		return def;		// dojo/_base/Deferred
	}
function(){
		// summary:
		//		Collapse this node (if it's expanded)

		if(this._collapseDeferred){
			// Node is already collapsed, or there's a collapse in progress, just return that Deferred
			return this._collapseDeferred;
		}

		// cancel in progress expand operation
		if(this._expandDeferred){
			this._expandDeferred.cancel();
			delete this._expandDeferred;
		}

		this.isExpanded = false;
		this.labelNode.setAttribute("aria-expanded", "false");
		if(this == this.tree.rootNode && this.tree.showRoot){
			this.tree.domNode.setAttribute("aria-expanded", "false");
		}
		domClass.remove(this.contentNode,'dijitTreeContentExpanded');
		this._setExpando();
		this._updateItemClasses(this.item);

		var def,
			wipeOut = fxUtils.wipeOut({
				node: this.containerNode,
				duration: manager.defaultDuration,
				onEnd: function(){
					def.resolve(true);
				}
			});

		// Deferred that fires when expand is complete
		def = (this._collapseDeferred = new Deferred(function(){
			// Canceller
			wipeOut.stop();
		}));

		wipeOut.play();

		return def;		// dojo/_base/Deferred
	}
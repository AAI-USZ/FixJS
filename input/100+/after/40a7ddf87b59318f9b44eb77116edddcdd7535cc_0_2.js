function(){
		
		this._container = this.getParent();
		this._closedSize = this._titleHeight = domGeom.getMarginBox(this.titleWrapper).h;
		
		if(this.splitter){
			// find our splitter and tie into it's drag logic
			var myid = this.id;
			arrayUtil.forEach(dijit.registry.toArray(), function(w){
				if(w && w.child && w.child.id == myid){
					this.connect(w,"_stopDrag","_afterResize");
				}
			}, this);
		}
		
		this._currentSize = domGeom.getContentBox(this.domNode);	// TODO: can compute this from passed in value to resize(), see _LayoutWidget for example
		this._showSize = this._currentSize[(this._isHorizontal ? "h" : "w")];
		this._setupAnims();

		if(this.startExpanded){
			this._showing = true;
		}else{
			this._showing = false;
			this._hideWrapper();
			this._hideAnim.gotoPercent(99,true);
		}
		
		this.domNode.setAttribute("aria-expanded", this._showing);
		this._hasSizes = true;
	}
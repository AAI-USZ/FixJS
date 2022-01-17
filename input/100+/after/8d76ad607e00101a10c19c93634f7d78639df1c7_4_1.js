function(){
		this.$supers(zul.layout.LayoutRegion, 'bind_', arguments);
		if (this.getPosition() != zul.layout.Borderlayout.CENTER) {
			var split = this.$n('split');			
			if (split) {
				this._fixSplit();
				var vert = this._isVertical(),
					LR = this.$class;
				
				this._drag = new zk.Draggable(this, split, {
					constraint: vert ? 'vertical': 'horizontal',
					ghosting: LR._ghosting,
					snap: LR._snap,
					zIndex: 12000,
					overlay: true,
					initSensitivity: 0,
					ignoredrag: LR._ignoredrag,
					endeffect: LR._endeffect
				});
				
				var colled = this.$n('colled');
				if (colled && zk.ios)
					jq(colled).css('cursor', 'pointer'); // ios need this style to trigger onClick event
				
				if (!this._open) {
					var real = this.$n('real');
					if (colled)
						jq(colled).show();
					jq(real).hide();
				}
				
				if(!this._visible){
					var real = this.$n('real');
					jq(real).hide();
					if (colled)
						jq(colled).hide();
				}
			}
		}
				
		var n = this.$n(),
			real = n.firstChild;
					
		if (this._open && !this.isVisible()) n.style.display = "none";
		
		if (this.isAutoscroll()) {
			var bodyEl = this.isFlex() && this.firstChild ?
					this.firstChild.$n() : this.$n('cave');
			this.domListen_(bodyEl, "onScroll");
		}
		
		if (this.isFlex())
			_setFirstChildFlex(this, true, true);
	}
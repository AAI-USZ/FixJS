function(){
		var self = this;
		this._adoptHandles(
			on(this.containerNode, on.selector(".dijitMenuItem", mouse.enter), function(){
				self.onItemHover(registry.byNode(this));
			}),
			on(this.containerNode, on.selector(".dijitMenuItem", mouse.leave), function(){
				self.onItemUnhover(registry.byNode(this));
			}),
			on(this.containerNode, on.selector(".dijitMenuItem", _OnDijitClickMixin.a11yclick), function(evt){
				self.onItemClick(registry.byNode(this), evt);
				evt.stopPropagation();
				evt.preventDefault();
			})
		);
		this.inherited(arguments);
	}
function(box, pview) {
	var toolbar_template = '<div class="microtoolbox"><span class="icon-comment-alt2"></span><span class="expand_props icon-logout"></span></div>';
	var InstanceBox = box.BoxView.extend({
		events: {
			'click .expand_props' : 'expand_props'
		},
		initialize:function() {
			var this_ = this;
			this.constructor.__super__.initialize.apply(this);
			this.bind('drag', function(offset) { this_._update_pview_offset(offset); })
		},
		render:function() {
			console.log('asking for const');
			this.constructor.__super__.render.apply(this);
			this.$el.append($(toolbar_template));
			return this.el;
		},
		expand_props:function(){
			if (this.pview) {
				this.pview.hide();
				delete this.pview;
				return;
			}
			// make visible
			this.pview = new pview.PropertyBox();
			this.$el.parent().append(pview.render());
			this._update_pview_offset({top:this.$el.css("top"), left:parseInt(this.$el.css('left'))});
		},
		_update_pview_offset:function(offset) {
			if (this.pview) {
				this.pview.setPosition({top:offset.top, left:offset.left});
			}
		}		
	});
	return { InstanceBox:InstanceBox };
}
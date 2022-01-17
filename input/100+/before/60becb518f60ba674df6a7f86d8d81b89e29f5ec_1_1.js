function(box) {
	var toolbar_template = '<div class="microtoolbox"><span class="expand_props icon-comment-alt2"></span><span class="expand_props icon-logout"></span></div>';
	var InstanceBox = box.BoxView.extend({
		events: {
			'click .expand_props' : 'expand_props'
		},
		initialize:function() {
			this.constructor.__super__.initialize.apply(this);
		},
		render:function() {
			console.log('asking for const');
			this.constructor.__super__.render.apply(this);
			this.$el.append($(toolbar_template));
			return this.el;
		},
		expand_props:function(){
			// console.log('expand props');
			var bv = new box.BoxView();
			$('#things').append(bv.render());
		}
	});
	return { InstanceBox:InstanceBox };
}
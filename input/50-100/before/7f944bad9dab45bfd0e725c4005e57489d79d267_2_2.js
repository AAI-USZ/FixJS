function(nodeName){
		var desc = webshims.defineNodeNameProperty(nodeName, 'placeholder', {
			attr: {
				set: function(val){
					var elem = this;
					webshims.contentAttr(elem, 'placeholder', val);
					pHolder.update(elem, val);
				},
				get: function(){
					return webshims.contentAttr(this, 'placeholder');
				}
			},
			reflect: true,
			initAttr: true
		});
	}
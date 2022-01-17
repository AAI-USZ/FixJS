function() {
	    	var that = this;
	    	TemplateManager.get(this.template, function(tmp) {
	    		var html = tmp(that.model.toJSON()), $ol;
		        that.$el.html(html);
		        $ol = that.$el.find('#blog-posts');
		        _.forEach(that.childViews, function(view) {
		            view.render().$el.appendTo($ol);
		        });
	    	});
	        
	        return this;
	    }
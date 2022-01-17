function(callback) {
	        var that = this;
	        TemplateManager.get(this.template, function(tmp) {
	            var html = tmp(that.model.toJSON());
	            that.$el.html(html);
	            that.onRenderComplete(callback);
	        });
	        return this;
	    }
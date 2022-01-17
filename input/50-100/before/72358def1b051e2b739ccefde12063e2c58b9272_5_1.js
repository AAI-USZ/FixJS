function() {
	        var that = this;
	        TemplateManager.get(this.template, function(tmp) {
	            var html = tmp(that.model.toJSON());
	            that.$el.html(html);
	        });
	        return this;
	    }
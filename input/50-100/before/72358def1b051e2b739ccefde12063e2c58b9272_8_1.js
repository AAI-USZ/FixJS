function() {
	        // Use template loader to do this part. This can come in handy if you need to load up
	        // `n` Summary views nested inside a List view. TemplateManager and Traffic Cop will
	        // throttle the amount of traffic that's actually sent to the server, and provide a
	        // boost in performance.
	        var that = this;
	        TemplateManager.get(this.template, function(tmp) {
	            var html = tmp(that.model.toJSON());
	            that.$el.html(html);
	        });
	        return this;
	    }
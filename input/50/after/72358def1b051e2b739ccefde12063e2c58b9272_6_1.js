function(tmp) {
	            var html = tmp(that.model.toJSON());
	            that.$el.html(html);
	            that.onRenderComplete(callback);
	        }
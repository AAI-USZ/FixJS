function(){
			var _this = this;
			this.trigger('load:start');

			$(this.layer.div).animate({
				opacity: .5
			},500, function(){
				_this.layer.clearGrid();
				_this.layer.events.register("loadend", _this, _this.onServiceURLChangeEnd);
				_this.layer.url = _this.model.get('service_url');	
				_this.layer.redraw();
			});
	    }
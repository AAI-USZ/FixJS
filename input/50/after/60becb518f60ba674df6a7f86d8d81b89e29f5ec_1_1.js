function() {
			var this_ = this;
			this.constructor.__super__.initialize.apply(this);
			this.bind('drag', function(offset) { this_._update_pview_offset(offset); })
		}
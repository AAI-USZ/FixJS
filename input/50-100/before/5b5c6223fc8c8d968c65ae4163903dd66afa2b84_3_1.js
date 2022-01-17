function() {
		   // if (this._DOMinited) { return; }
		    this._DOMinited = true;

		    var self = this;
		    $.each(self.enableModules, function(idx, value) {
			    if (value !== false && $.sn[idx] !== undefined && $.sn[idx]._DOMChanged !== undefined) {
				    $.sn[idx]._DOMChanged();
			    }
		    });
		    $.sn._resize();
		    this._DOMinited = false;

	    }
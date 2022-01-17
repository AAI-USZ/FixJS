function(evt) {
					// converts an entire event
					var new_evt = {};
					_(evt).keys().map(function(k) {
						new_evt[k] = _convert_val(evt[k],k);
					});
					return new_evt;
				}
function() {
				var sel = $(this);
				if(sel.data('freetrans')){
					_setOptions(sel, options);
				} else {
					_init(sel, options);
				}
			}
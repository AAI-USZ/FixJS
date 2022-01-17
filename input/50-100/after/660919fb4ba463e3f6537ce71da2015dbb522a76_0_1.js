function() {
				var sel = $(this), d = sel.data('freetrans');
				if(d){
					_setOptions(sel, options);
					_draw(sel);
				} else {
					_init(sel, options);
					_draw(sel);
				}
			}
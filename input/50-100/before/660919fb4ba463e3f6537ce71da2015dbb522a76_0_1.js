function() {
				var sel = $(this), d = sel.data('freetrans');
				if(d){
					_setOptions(sel, options);
					_draw(sel);
					if(safari) _safari(sel);
				} else {
					_init(sel, options);
					_draw(sel);
				}
			}
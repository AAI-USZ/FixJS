function(evt) {
				
				if (scaleMe) {
					scaleMe(Point(evt.pageX, evt.pageY));

					if(evt.shiftKey) {
						if(!handle.hasClass('ft-scaler-center')) {
							data.scaley = ((owid*data.scalex)*(1/ratio))/ohgt;
							
							if(handle.is(ml)) {
							 	positionMe = function() {
									doPosition(mr_off, container.find('.ft-scaler-mr').offset());
								};
							} else if (handle.is(mr)) {
								positionMe = function() {
									doPosition(ml_off, container.find('.ft-scaler-ml').offset());
								};
							}

						} else {
							data.scalex = ((ohgt*data.scaley)*ratio)/owid;
							if(handle.is(tc)) {
								positionMe = function() {
									doPosition(bc_off, container.find('.ft-scaler-bc').offset());
								};
							} else {
								positionMe = function() {
									doPosition(tc_off, container.find('.ft-scaler-tc').offset());
								};
							}
						}
						
					}
					
					_draw(sel);
					if(safari) _safari(sel);

					if (positionMe) positionMe();
				};
			}
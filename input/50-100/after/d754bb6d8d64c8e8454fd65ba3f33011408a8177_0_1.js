function(e, ui){
					var thisPage = this;
					if( o.updatePagePadding ){
						// padding on pageshow is just needed on first toolbar-page
						if ( !ui.nextPage ) {
							self.updatePagePadding( thisPage );
						}

						$( window ).bind( "throttledresize." + self.widgetName, function(){
						 	self.updatePagePadding( thisPage );
						});
					}
				}
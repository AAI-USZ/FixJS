function(){
					self.updatePagePadding();
					if( o.updatePagePadding ){
						$( window ).bind( "throttledresize." + self.widgetName, function(){
						 	self.updatePagePadding();
						});
					}
				}
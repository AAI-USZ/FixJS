function( e ){
			
			
			 $( document )
			 	 .unbind( 'mousemove.' + self.widgetEventPrefix )
			 	 .enableSelection()
			 	 .css( 'cursor', 'move')
	             
			
			self.prevMouseX = 0;
			
			this._eventHelper('stop',e,{});  
	                    
		}
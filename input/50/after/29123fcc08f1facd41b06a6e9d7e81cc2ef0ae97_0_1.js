function( e ){
			
			 $( document )
			 	 .unbind( 'mousemove.' + this.widgetEventPrefix )
			 	 .enableSelection()
			 	 .css( 'cursor', 'move')
	             
			
			this.prevMouseX = 0;
			
			this._eventHelper('stop',e,{});  
	                    
		}
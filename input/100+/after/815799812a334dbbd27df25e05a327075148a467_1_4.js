function(params){
		var container = this.options.cy.container();
	
		
		
		if( params.type == null ){
			//$.error("The SVG renderer should be notified with a `type` field");
			return;
		}
		
		var self = this;
		switch( params.type ){
			case "load":
				self.init(function(){
					self.addElements( params.collection );
				});
				break;
		
			case "add":
				this.addElements( params.collection, params.updateMappers );
				break;
			
			case "remove":
				this.removeElements( params.collection, params.updateMappers );
				break;
			
			case "position":
				this.updatePosition( params.collection );
				break;
			
			case "style":
				this.updateStyle( params.collection );
				break;

			case "viewport":
				this.updateViewport();
				break;
				
			default:
				
				break;
		}
	}
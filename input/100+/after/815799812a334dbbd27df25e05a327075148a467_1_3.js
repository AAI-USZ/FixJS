function(collection, updateMappers){
		
		
		var container = this.cy.container();
		var svg = container.svg('get');
		var cy = this.options.cy;
		var self = this;
		
		collection.each(function(i, element){
			
			if( element.rscratch().svgGroup != null ){
				// remove the svg element from the dom
				self.svgRemove( element.rscratch().svgGroup );
				
				element.rscratch({});
			} else {
				
			}
		});
		
		if( self.selectedElements != null ){
			self.selectedElements = self.selectedElements.not(collection);
		}

		var edgesToReposition = self.cy.collection();
		collection.edges().each(function(i, edge){
			var src = edge.source();
			var tgt = edge.target();

			edgesToReposition = edgesToReposition.add( src.edgesWith( tgt ) );
		});

		edgesToReposition = edgesToReposition.not( collection.edges() );

		self.updatePosition( edgesToReposition );
		
		// if( updateMappers ){
		// 	this.updateMapperBounds( collection );
		// }
	}
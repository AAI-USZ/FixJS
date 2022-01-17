function(i, element){
			
			if( element.rscratch().svgGroup != null ){
				// remove the svg element from the dom
				self.svgRemove( element.rscratch().svgGroup );
				
				element.rscratch({});
			} else {
				
			}
		}
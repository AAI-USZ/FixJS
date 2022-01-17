function(i, element){
			
			if( element.rscratch().svgGroup != null ){
				// remove the svg element from the dom
				svg.remove( element.rscratch().svgGroup );
				
				element.rscratch({});
			} else {
				
			}
		}
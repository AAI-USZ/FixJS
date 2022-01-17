function(e){
		for ( var i = 0; i < Draggable.elements.length; i++ ){
			var intersect = Droppable.intersect(this,Draggable.elements[i]);
			if(intersect){
				console.log("INTERSECT",Draggable.elements[i]);
			}
		}	
 	}
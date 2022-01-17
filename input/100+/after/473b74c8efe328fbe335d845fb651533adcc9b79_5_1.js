function moveTo(group, moveTo, direction) {
	
		if ( direction == 'bottom' ) {
	
			for ( var i = group.length - 1; i >= 0; i-- ) {
			
				this.onmove(
					indexOfNode(group[i]),
					indexOfNode(moveTo.nextSibling)
				)
			
				this.node.insertBefore(group[i], moveTo.nextSibling)
			}
		} else {
		
			for ( var i = 0; i < group.length; i++ ) {
				
				this.onmove(
					indexOfNode(group[i]),
					indexOfNode(moveTo)
				)
				
				this.node.insertBefore(group[i], moveTo)
			}
		}
	}
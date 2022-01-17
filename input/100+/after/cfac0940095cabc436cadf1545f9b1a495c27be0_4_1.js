function moveTo(group, moveTo, direction) {
	
		if ( direction == 'bottom' ) {
	
			for ( var i = group.length - 1; i >= 0; i-- ) {
			
				this.onbeforemove(
					util.indexOfNode(group[i]),
					util.indexOfNode(moveTo),
					'after'
				)
			
				this.node.insertBefore(
					group[i],
					moveTo.nextSibling
				)
				
				this.onaftermove(
					util.indexOfNode(group[i]),
					util.indexOfNode(moveTo),
					'after'
				)
			}
		} else {
		
			for ( var i = 0; i < group.length; i++ ) {
				
				if ( this.onbeforemove ) {
					this.onbeforemove(
						util.indexOfNode(group[i]),
						util.indexOfNode(moveTo)
					)
				}
				
				this.node.insertBefore(
					group[i],
					moveTo,
					'before'
				)
				
				if ( this.onaftermove ) {
					this.onaftermove(
						util.indexOfNode(group[i]),
						util.indexOfNode(moveTo)
					)
				}
			}
		}
	}
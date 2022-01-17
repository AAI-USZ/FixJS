function dragDrop(item, index) {
	
		if ( window.dropZone == 'rearrangeablelist' ) {
		
			var group,
				draggedNode = this.node.childNodes[index]
			
			if ( util.hasClass(draggedNode, 'selected') ) {
			
				group = this.selectedNodes
			} else {
			
				group = [draggedNode]
			}
			
			this.onmoved(index)
			
			moveTo.call(this, group, item, window.dropRegion)
			
			window.dropRegion = undefined
		}
		
		util.removeNode(document.getElementById('dropIndicator'))
	}
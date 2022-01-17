function(options) {
	
		// rearrangeable list node.
		this.node = util.createElement({
			tag : 'ol',
			customClass : 'UIRearrangeableListWidget',
			appendTo : (options.appendTo instanceof Element) ? options.appendTo : document.body
		})
		
		this.onmoved = options.onmoved
		this.onnoderemoved = options.onnoderemoved
		
		// list of selected nodes.
		this.selectedNodes = []
	}
function(options) {
	
		// rearrangeable list node.
		this.node = util.createElement({
			tag : 'ol',
			customClass : 'UIRearrangeableListWidget',
			appendTo : (options.appendTo instanceof Element) ? options.appendTo : document.body
		})
		
		this.onmove = options.onmove
		this.onremove = options.onremove
		
		// list of selected nodes.
		this.selectedNodes = []
	}
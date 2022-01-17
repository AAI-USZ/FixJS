function(options) {
	
		// rearrangeable list node.
		this.node = util.createElement({
			tag : 'ol',
			customClass : 'UIRearrangeableListWidget',
			appendTo : (options.appendTo instanceof Element) ? options.appendTo : document.body
		})
		
		if ( options.onbeforemove ) {
			this.onbeforemove = options.onbeforemove
		}
		
		if ( options.onaftermove ) {
			this.onaftermove = options.onaftermove
		}
		
		if ( options.onremove ) {
			this.onremove = options.onremove
		}
		
		// list of selected nodes.
		this.selectedNodes = []
	}
function() {
		this.backgroundColor		= check_color(this.backgroundColor)
		this.borderColor			= check_color(this.borderColor)
		this.legend_fontColor		= check_color(this.legend_fontColor)
		this.legend_borderColor 	= check_color(this.legend_borderColor)
		this.legend_backgroundColor	= check_color(this.legend_backgroundColor)

		this.nodesByID = {}
		//Store nodes in object
		for(var i in this.nodes){
			var node = this.nodes[i]
			if (this.nodesByID[node.id]){
				this.nodesByID[node.id].metrics.push(node.metrics[0])
			}else{
				this.nodesByID[node.id] = Ext.clone(node)
				this.nb_node += 1;
			}
		}
		log.debug('nodesByID:', this.logAuthor);
		log.dump(this.nodesByID)

		//Set title
		if (this.autoTitle) {
			this.setchartTitle();
			this.title = '';
		}else {
			if (! this.border) {
				this.chartTitle = this.title;
				this.title = '';
			}
		}

		this.callParent(arguments);
	}
function visualiseNode(node, x, y){
				++c;
				var that = this,
					newNode = this.getBlankNode(x, y),
					nodeType = node.nodeType.toLowerCase(),
					visualizedNode
					;

				newNode.id = node.nodeId;
				newNode.label = node.nodeLabel;
				newNode.type = node.nodeType;
				newNode.serviceName = node.physicalDescription.serviceName;
				newNode.set = view.paper.set();
				newNode.inputs = [];
				$.each(node.functionalDescription.inputs, function(){
					newNode.inputs.push( $.extend(true, {}, this) );
				});
				newNode.outputs = [];
				$.each(node.functionalDescription.outputs, function(){
					newNode.outputs.push( $.extend(true, {}, this) );
				});

				visualizedNode = ( this["draw_"+nodeType+"Node"] || this.draw_unknownNode )(newNode) ;

				function close(){
					view.tooltip.close();
				}
				$.each(visualizedNode.inputs, function(){
					this.description = visualizedNode.prepareDescriptionForInput(this.id);
					this.node.mouseover(
						(function(that){
							return function(evt, x, y){
								view.tooltip.open(visualizedNode.label+": "+that.id, that.description, x, y, evt);
							};
						})(this)
					).mouseout(close)
					;
				});
				$.each(visualizedNode.outputs, function(){
					this.description = visualizedNode.prepareDescriptionForOutput(this.id);
					this.node.mouseover(
						(function(that){
							return function(evt, x, y){
								// alert(visualizedNode.label);
								view.tooltip.open(visualizedNode.label+": "+that.id, that.description, x, y, evt);
							};
						})(this)
					).mouseout(close)
					;
				});
				visualizedNode.prepareNodeDescription();

				visualizedNode.mainShape.mouseover(
					(function(that){
						return function(evt, x, y){
							view.tooltip.open(that.type+":"+that.label, that.description, x, y, evt);
						};
					})(visualizedNode)
				).mouseout(close)
				;

				return visualizedNode;
			}
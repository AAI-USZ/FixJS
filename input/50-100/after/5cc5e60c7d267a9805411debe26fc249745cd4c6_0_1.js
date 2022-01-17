function(){
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
				}
function(context, elem){
						$('canvas', context).add(elem.filter('canvas')).each(function(){
							var hasContext = this.getContext;
							if(!hasContext && window.G_vmlCanvasManager){
								G_vmlCanvasManager.initElement(this);
							}
						});
						if(context == document){
							isReady('canvas', true);
						}
					}
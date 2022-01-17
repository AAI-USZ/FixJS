function(){
					var wasReady = $.isReady;
					var triggerReady = function(){
						isReady('canvas', true);
					};
					webshims.addReady(function(context, elem){
						$('canvas', context).add(elem.filter('canvas')).each(function(){
							var hasContext = this.getContext;
							if(!hasContext && window.G_vmlCanvasManager){
								G_vmlCanvasManager.initElement(this);
							}
						});
						if(context == document){
							if(wasReady){
								triggerReady();
							} else {
								setTimeout(triggerReady,0);
							}
						}
					});
				}
function(){
						// remove this listener
						listeners.splice(array.indexOf(listeners, listener), 1);
						if(!listeners.length){
							// no more listeners, remove the query updater too
							queryUpdaters.splice(array.indexOf(queryUpdaters, queryUpdater), 1);
						}
					}
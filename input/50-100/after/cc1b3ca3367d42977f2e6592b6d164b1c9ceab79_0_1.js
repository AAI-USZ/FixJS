function(){
						// remove this listener
						var index = array.indexOf(listeners, listener);
						if(index > -1){ // check to make sure we haven't already called cancel
							listeners.splice(index, 1);
							if(!listeners.length){
								// no more listeners, remove the query updater too
								queryUpdaters.splice(array.indexOf(queryUpdaters, queryUpdater), 1);
							}
						}						
					}
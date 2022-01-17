function(){
							while(!--preloading && preloadWaitQueue.length){
								load.apply(null, preloadWaitQueue.shift());
							}
						}
function () {
					if (lifecycleEvent === 'WillBecomeActive' || lifecycleEvent === 'DidBecomeActive') {
						nodeWillBecomeActive(node, function () {				
							if (lifecycleEvent === 'DidBecomeActive') {
								nodeDidBecomeActive(node, complete);
							} else {
								complete();
							}
						});
					} else {
						complete();						
					}
/*					
							that.refresh();
							// flush any tasks that were queued up during lifecycle events
							flushWaitTasks(function () {
								flowObservers.forEach(function (observer) {									
									if (observer.update) {
										observer.update();
									}
								});								
								cb();
							});
*/				
				}
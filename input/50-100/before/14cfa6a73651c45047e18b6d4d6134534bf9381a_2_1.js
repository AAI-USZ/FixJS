function () {
					nodeWillBecomeActive(node, function () {				
						nodeDidBecomeActive(node, function () {
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
						});
					});																		
				}
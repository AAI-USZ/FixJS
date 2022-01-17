function (id, flowspec, parent, pkg, cb) {
			var lifecycleEvent = F5.lifecycleEvent;

			function complete() {
				F5.lifecycleEvent = lifecycleEvent;
				cb();
			}

			var node = F5.Global.flow.importNode(id, flowspec, parent, pkg);
			if (node.active) {
				nodeInitialize(node, function () {
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
				});								
			}
		}
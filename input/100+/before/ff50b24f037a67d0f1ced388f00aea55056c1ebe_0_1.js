function (cb) {
			var that = this;
				
			cb = cb || function () {
				console.log('start complete');
			};
						
			var stateKey = F5.appPkg + '_state';
			if (localStorage[stateKey]) {
				var packageListKey = F5.appPkg + '_packages';
				if (localStorage[packageListKey]) {
					var that = this;
					JSON.parse(localStorage[packageListKey]).forEach(function (pkg) {
						var contents = JSON.parse(localStorage[pkg]).result;
						that.addWaitTask(function (cb) {
							F5.unpackPackage(pkg, contents, cb);							
						});
					});
				}
				F5.Global.flow.initialize(F5.appPkg, JSON.parse(localStorage[stateKey]));								
			} else {
				F5.Global.flow.initialize(F5.appPkg, F5.valueFromId(F5.Flows, F5.appPkg));				
			}
			
			// TODO: sloppy. why isn't initialize part of observer?
			if (F5.Global.viewController) {
				F5.Global.viewController.initialize();				
			}
			
			// flush any tasks that were waiting on init
			flushWaitTasks(function () {

				flowObservers.forEach(function (observer) {
					if (observer.start) {
						observer.start();
					}
				});	
				
				nodeInitialize(flow.root, function () {
					nodeWillBecomeActive(flow.root, function () {				
						nodeDidBecomeActive(flow.root, function () {
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
				});								
			});		
		}
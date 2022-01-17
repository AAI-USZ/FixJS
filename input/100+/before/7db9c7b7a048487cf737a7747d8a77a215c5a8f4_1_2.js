function (target) {
					var isStartUrl = baseUrl(target.tab.url) == baseUrl(target.startUrl);
					if (target.tab.url == '' || target.state && !isStartUrl) {
						emit(target.callback, target.tab.url);
						target.callback = null;
					}
					else {
						if (!target.state && isStartUrl) {
							target.state = true;
						}
						newTargets.push(target);
					}
				}
function (target) {
					var currentUrl;
					try {
						currentUrl = target.tab.url || '';
					}
					catch (e) {
						currentUrl = '';
					}

					var isStartUrl = baseUrl(currentUrl) == baseUrl(target.startUrl);
					if (currentUrl == '' || target.state && !isStartUrl) {
						emit(target.callback, currentUrl);
						target.callback = null;
					}
					else {
						if (!target.state && isStartUrl) {
							target.state = true;
						}
						newTargets.push(target);
					}
				}
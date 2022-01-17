function FirefoxJetpackTabWatcher () {
		var targets = [];
		var timer;

		function startTimer () {
			if (timer) return;
			timer = setInterval(function () {
				var newTargets = [];
				targets.forEach(function (target) {
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
				});
				if (newTargets.length == 0) {
					clearInterval(timer);
					timer = null;
				}
				else {
					targets = newTargets;
				}
			}, 1000);
		}

		this.add = function (id, url, callback) {
			// in this context, id is Tab object instance.
			targets.push({tab:id, startUrl:url, callback:callback});
			startTimer();
			return true;
		};
	}
function(url) {
				if (app == 'python') {
					document.title = 'isolate_window|url'
				} else {
					var width = 960,
						height = 600
						left = (screen.width / 2) - (width / 2),
						top = (screen.height / 2) - (height / 2)
					window.open(url, Math.random(), 'toolbar=no, type=popup, status=no, width='+width+', height='+height+', top='+top+', left='+left)
				}
			}
function(e) {
				var marginLeft = modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft;
				marginLeft = parseInt(marginLeft.replace('px',''));
				var shiftWidth = $('#RESShortcutsViewport').width() - 80;
				if (isNaN(marginLeft)) marginLeft = 0;
				marginLeft += shiftWidth;
				if (marginLeft <= 0) {
					modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft = marginLeft + 'px';
				}
			}
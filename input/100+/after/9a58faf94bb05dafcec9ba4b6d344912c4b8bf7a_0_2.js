function(e) {
				modules['subredditManager'].containerWidth = modules['subredditManager'].shortCutsContainer.offsetWidth;
				// var marginLeft = modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft;
				// width of browser minus width of left container plus a bit extra for padding...
				// var containerWidth = window.innerWidth + 20 - modules['subredditManager'].srLeftContainer.scrollWidth;
				var marginLeft = modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft;
				marginLeft = parseInt(marginLeft.replace('px',''));
				if (isNaN(marginLeft)) marginLeft = 0;
				var shiftWidth = $('#RESShortcutsViewport').width() - 80;
				if (modules['subredditManager'].containerWidth > (shiftWidth)) {
					marginLeft -= shiftWidth;
					modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft = marginLeft + 'px';
				} else {
					// console.log('already all the way over.');
				}
			}
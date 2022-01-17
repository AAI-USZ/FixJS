function(e) {
				var marginLeft = modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft;
				marginLeft = parseInt(marginLeft.replace('px',''));
				if (isNaN(marginLeft)) marginLeft = 0;
				marginLeft += (window.innerWidth - 380);
				if (marginLeft <= 0) {
					modules['subredditManager'].shortCutsContainer.firstChild.style.marginLeft = marginLeft + 'px';
				}
			}